import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  score: number; // Pontuação total do usuário

  @Prop()
  lastAttemptDate: Date; // Data da última tentativa

  @Prop({ default: 0 })
  dailyAttempts: number; // Número de tentativas diárias

  @Prop({ default: 0 })
  dailyScore: number; // Pontuação diária do usuário
}

export const UserSchema = SchemaFactory.createForClass(User);
