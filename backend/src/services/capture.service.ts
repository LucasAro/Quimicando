import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Capture } from '../interfaces/capture.interface';

@Injectable()
export class CaptureService {
  constructor(@InjectModel('Capture') private readonly captureModel: Model<Capture>) {}

  // Buscar todas as capturas
  async findAll(): Promise<Capture[]> {
    return await this.captureModel.find().exec();
  }

  // Criar uma nova captura
  async createCapture(capture: Capture): Promise<Capture> {
    const newCapture = new this.captureModel(capture);
    return await newCapture.save();
  }
}
