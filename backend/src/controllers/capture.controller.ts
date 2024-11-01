import { Controller, Get, Post, Body } from '@nestjs/common';
import { CaptureService } from '../services/capture.service';
import { Capture } from '../interfaces/capture.interface';

@Controller('captures')
export class CaptureController {
  constructor(private readonly captureService: CaptureService) {}

  // Rota GET para buscar todas as capturas
  @Get()
  async getAllCaptures(): Promise<Capture[]> {
    return this.captureService.findAll();
  }

  // Rota POST para criar uma nova captura
  @Post()
  async createCapture(@Body() capture: Capture): Promise<Capture> {
    return this.captureService.createCapture(capture);
  }
}
