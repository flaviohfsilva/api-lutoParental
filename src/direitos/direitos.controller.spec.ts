import { Test, TestingModule } from '@nestjs/testing';
import { DireitosController } from './direitos.controller';
import { DireitosService } from './direitos.service';

describe('DireitosController', () => {
  let controller: DireitosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DireitosController],
      providers: [DireitosService],
    }).compile();

    controller = module.get<DireitosController>(DireitosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
