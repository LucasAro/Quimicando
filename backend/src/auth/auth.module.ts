import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Módulo de usuários
import { JwtAuthGuard } from './jwt-auth.guard'; // Importa o guard que acabamos de criar
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      secret: 'secretKey', // Use uma chave secreta forte para assinar os tokens
      signOptions: { expiresIn: '1d' }, // O token expira em 1 dia
    }),
  ],
  providers: [AuthService, JwtAuthGuard], // Inclui o guard nos providers
  exports: [AuthService, JwtModule],
  controllers: [AuthController], // Registre o AuthController

})
export class AuthModule {}
