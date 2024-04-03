import { Test, TestingModule } from '@nestjs/testing';
import { DireitosService } from './direitos.service';

describe('DireitosService', () => {
  let service: DireitosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DireitosService],
    }).compile();

    service = module.get<DireitosService>(DireitosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
