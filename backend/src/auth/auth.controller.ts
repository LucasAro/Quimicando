import { Controller, Post, Body, HttpCode, HttpStatus, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // Rota de registro
  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    // Verifica se o usuário já existe
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already taken');
    }

    // Criptografa a senha e cria o usuário
    const hashedPassword = await this.authService.hashPassword(password);
    const user = await this.usersService.createUser(username, hashedPassword);

    // Retorna o usuário criado
    return { message: 'User registered successfully', user };
  }

  // Rota de login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    // Busca o usuário pelo nome
    const user = await this.usersService.findByUsername(username);

    // Verifica se o usuário existe e se a senha é válida
    if (!user || !(await this.authService.comparePasswords(password, user.password))) {
      return { message: 'Invalid credentials' };
    }

    // Gera o JWT
    const token = await this.authService.generateJwt(user._id as string, user.username);
    return { access_token: token };
  }
}

