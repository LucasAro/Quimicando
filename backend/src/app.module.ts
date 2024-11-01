import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CaptureController } from './controllers/capture.controller';
import { CaptureService } from './services/capture.service';
import { CaptureSchema } from './schemas/capture.schema';
import { MoleculeModule } from './molecule/molecule.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RankingsController } from './controllers/rankings.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/quimicando'), // URL do Mongo no Docker Compose
    MoleculeModule, AuthModule, UsersModule// Seu módulo para moléculas
  ],
  controllers: [RankingsController],
  providers: [],
})
export class AppModule {}
