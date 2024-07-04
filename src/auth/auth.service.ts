import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareHash } from './utils/handleBcrypt';

import { LoginAuthDto } from './dto/login-auth.dto';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Iniciar sesion
   * @param userLoginBody
   * @returns
   */
  public async login(userLoginBody: LoginAuthDto) {
    try {
      const { password, email } = userLoginBody;

      const userExist = await this.userModel.findOne({ email });
      if (!userExist)
        throw {
          message: 'PASSWORD INVALID OR EMAIL INVALID',
          status: 'UNAUTHORIZED',
        };

      const isCheck = await compareHash(password, userExist.password);
      if (!isCheck)
        throw {
          message: 'PASSWORD INVALID OR EMAIL INVALID',
          status: 'UNAUTHORIZED',
        };
      const userFlat = userExist.toObject();

      const token = this.jwtService.sign({
        name: userFlat.name,
        lastName: userFlat.lastName,
        email: userFlat.email,
      });

      const data = {
        token,
        fullName: `${userFlat.name} ${userFlat.lastName}`,
        email: userFlat.email,
      };
      throw {
        message: 'AUTHORIZED',
        status: 'OK',
        data: data,
      };
    } catch (error) {
      if (!error.message) {
        throw new HttpException(
          'ups error server',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const { status, ...message } = error;
      throw new HttpException(
        message,
        HttpStatus[status as keyof typeof HttpStatus],
      );
    }
  }
}
