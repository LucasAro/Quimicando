import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Molecule extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  formula: string;

  @Prop({ required: true, type: [String] })
  hints: string[];
}

export const MoleculeSchema = SchemaFactory.createForClass(Molecule);
