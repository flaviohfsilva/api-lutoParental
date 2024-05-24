import { Test, TestingModule } from '@nestjs/testing';
import { NoticiasService } from './noticias.service';
import { noticiaProviders } from './noticias.providers';

describe('NoticiasService', () => {
  let service: NoticiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoticiasService, ...noticiaProviders],
    }).compile();

    service = module.get<NoticiasService>(NoticiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
