import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

// Mock para el servicio de JWT
const jwtServiceMock = {
  sign: jest.fn(() => 'mocked-token'),
};

// Mock del schema de mongo
const userModelMock = {
  findOne: jest.fn(),
  create: jest.fn(),
};

// Mock para el servicio de correo
const clientMailServiceMock = {
  emit: jest.fn(),
};


describe('Examen del AuthService', () => {
  let service: AuthService;




  describe('Login', () => {
    it('should return token and user data on successful login', async () => {

      /**
       * Maqueta del Usuario
       */
      const userLoginBody: LoginAuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      /**
       * Maqueta de la respuesta de la base de datos de mongodb
       */
      const userExist = {
        toObject: jest.fn(() => ({
          _id: 'mocked-id',
          password: 'hashed-password'
        })),
      };


      userModelMock.findOne.mockResolvedValueOnce(userExist);
      jwtServiceMock.sign.mockReturnValueOnce('mocked-token');

      // Configura el comportamiento del mock para compareHash
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await service.login(userLoginBody);


      expect(userModelMock.findOne).toHaveBeenCalledWith({ email: userLoginBody.email });
      expect(result).toEqual({ token: 'mocked-token', user: { _id: 'mocked-id' } });
    });

    it('should throw NOT_FOUND exception if user does not exist', async () => {
      const userLoginBody: LoginAuthDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      userModelMock.findOne.mockResolvedValueOnce(null);

      await expect(service.login(userLoginBody)).rejects.toThrowError('NOT_FOUND');
    });

    it('should throw PASSWORD_INVALID exception if password is incorrect', async () => {
      const userLoginBody: LoginAuthDto = {
        email: 'test@example.com',
        password: '123456',
      };

      const userExist = { _id: 'mocked-id', password: '12345678' };
      userModelMock.findOne.mockResolvedValueOnce(userExist);
      jwtServiceMock.sign.mockReturnValueOnce('mocked-token');

      await expect(service.login(userLoginBody)).rejects.toThrowError('PASSWORD_INVALID');
    });
  })


  

});
