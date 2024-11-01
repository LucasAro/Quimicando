import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Molecule } from './molecule.schema';

@Injectable()
export class MoleculeService {
  constructor(
    @InjectModel(Molecule.name) private moleculeModel: Model<Molecule>,
  ) {}

  // Obter a molécula do dia
  async getMoleculeOfTheDay(): Promise<Molecule> {
    return await this.moleculeModel.findOne(); // Ou lógica para selecionar uma molécula aleatória
  }

  // Criar uma nova molécula
  async createMolecule(name: string, formula: string, hints: string): Promise<Molecule> {
    const newMolecule = new this.moleculeModel({ name, formula, hints });
    return await newMolecule.save();
  }

  async updateMolecule(id: string, hints: string[]): Promise<Molecule> {
	return this.moleculeModel.findByIdAndUpdate(id, { hints }, { new: true });
  }

}
