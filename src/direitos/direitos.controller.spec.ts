import { Test, TestingModule } from '@nestjs/testing';
import { DireitosController } from './direitos.controller';
import { DireitosService } from './direitos.service';
import { direitosProviders } from './direitos.providers';

describe('DireitosController', () => {
  let controller: DireitosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DireitosController],
      providers: [DireitosService, ...direitosProviders],
    }).compile();

    controller = module.get<DireitosController>(DireitosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
