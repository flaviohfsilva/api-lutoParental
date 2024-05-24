import { Test, TestingModule } from '@nestjs/testing';
import { DireitosService } from './direitos.service';
import { direitosProviders } from './direitos.providers';

describe('DireitosService', () => {
  let service: DireitosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DireitosService, ...direitosProviders],
    }).compile();

    service = module.get<DireitosService>(DireitosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
