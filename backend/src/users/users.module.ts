import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Registra o schema do usuário
  ],
  providers: [UsersService],
  exports: [UsersService], // Exporta o serviço para que possa ser usado em outros módulos (como o AuthModule)
})
export class UsersModule {}
