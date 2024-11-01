import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Função para criptografar a senha
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // Verificar a senha no login
  async comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, storedPasswordHash);
  }

  // Gerar o JWT após o login
  async generateJwt(userId: string, userName: string): Promise<string> {
    const payload = { sub: userId, name: userName };
    return this.jwtService.sign(payload);
  }
}