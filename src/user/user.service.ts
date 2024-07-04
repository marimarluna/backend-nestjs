import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
    const { email } = createUserDto;
    const userExist = await this.userModel.findOne({ email: email });
    if (userExist) {
      return 'User Exist';
    }
    const userCreate = await this.userModel.create(createUserDto);
    if (userCreate) {
      return 'Create new user';
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }
}
