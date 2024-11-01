import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoleculeService } from './molecule.service';
import { MoleculeController } from './molecule.controller';
import { Molecule, MoleculeSchema } from './molecule.schema';
import { AuthModule } from '../auth/auth.module'; // Importe o AuthModule que contém o JwtService
import { UsersModule } from '../users/users.module'; // Importar UsersModule também, se necessário


@Module({
  imports: [MongooseModule.forFeature([{ name: Molecule.name, schema: MoleculeSchema }]), AuthModule, UsersModule], // Importa o AuthModule e UsersModule
  controllers: [MoleculeController],
  providers: [MoleculeService],
})
export class MoleculeModule {}
