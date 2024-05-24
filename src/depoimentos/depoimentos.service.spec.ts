import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentosService } from './depoimentos.service';
import { depoimentoProviders } from './depoimentos.providers';

describe('DepoimentosService', () => {
  let service: DepoimentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepoimentosService, ...depoimentoProviders],
    }).compile();

    service = module.get<DepoimentosService>(DepoimentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
