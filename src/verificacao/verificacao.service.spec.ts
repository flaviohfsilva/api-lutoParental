import { Test, TestingModule } from '@nestjs/testing';
import { VerificacaoService } from './verificacao.service';
import { verificacaoProviders } from './verificacao.providers';

describe('VerificacaoService', () => {
  let service: VerificacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificacaoService, ...verificacaoProviders],
    }).compile();

    service = module.get<VerificacaoService>(VerificacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
