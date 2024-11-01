import { Test, TestingModule } from '@nestjs/testing';
import { MoleculeController } from './molecule.controller';

describe('MoleculeController', () => {
  let controller: MoleculeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoleculeController],
    }).compile();

    controller = module.get<MoleculeController>(MoleculeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
