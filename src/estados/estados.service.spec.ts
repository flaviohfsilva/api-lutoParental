import { Test, TestingModule } from '@nestjs/testing';
import { EstadosService } from './estados.service';
import { estadosProviders } from './estados.providers';

describe('EstadosService', () => {
  let service: EstadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadosService, ...estadosProviders],
    }).compile();

    service = module.get<EstadosService>(EstadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
