import { Test, TestingModule } from '@nestjs/testing';
import { VerificacaoController } from './verificacao.controller';
import { VerificacaoService } from './verificacao.service';
import { verificacaoProviders } from './verificacao.providers';

describe('VerificacaoController', () => {
  let controller: VerificacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificacaoController],
      providers: [VerificacaoService, ...verificacaoProviders],
    }).compile();

    controller = module.get<VerificacaoController>(VerificacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
