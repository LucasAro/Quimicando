import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // Cria um novo usuário
  async createUser(username: string, password: string): Promise<User> {
    const newUser = new this.userModel({ username, password });
    return newUser.save();
  }

  // Busca um usuário pelo nome
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  // Função para encontrar o usuário pelo ID
  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  // Função para salvar as mudanças no usuário
  async saveUser(user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(user._id, user, { new: true });
  }

  // Função que retorna todos os usuários ordenados por score (descendente)
  async findAllOrderedByScore(): Promise<User[]> {
    return this.userModel.find().sort({ score: -1 }).exec(); // Ordena por score (maior para o menor)
  }
}
