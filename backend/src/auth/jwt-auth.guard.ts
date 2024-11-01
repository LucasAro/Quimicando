import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false; // Bloqueia o acesso se o cabeçalho Authorization não estiver presente
    }

    const token = authHeader.split(' ')[1]; // O token JWT é enviado como "Bearer <token>"
    if (!token) {
      return false; // Se não houver token, bloqueia o acesso
    }

    try {
      // Verifica o token JWT
      const payload = this.jwtService.verify(token);
      request.user = payload; // Anexa o payload do token ao objeto request
      return true;
    } catch (error) {
      return false; // Se o token for inválido, bloqueia o acesso
    }
  }
}
