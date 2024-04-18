import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { ApiTags } from '@nestjs/swagger';
import { Paginas } from 'src/interfaces';

@ApiTags('Notícias')
@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.create(createNoticiaDto);
  }

  @Get('buscarTodas')
  findAll() {
    return this.noticiasService.buscarTodasNoticias();
  }

  @Get('buscarPor:id')
  findOne(@Param('id') id: string) {
    return this.noticiasService.buscarNoticiaPorId(+id);
  }

  @Patch('atualizar:id')
  update(@Param('id') id: string, @Body() updateNoticiaDto: UpdateNoticiaDto) {
    return this.noticiasService.atualizarNoticia(+id, updateNoticiaDto);
  }

  @Delete('excluir:id')
  remove(@Param('id') id: string) {
    return this.noticiasService.excluirNoticia(+id);
  }

  @Get('buscarPaginas/')
  paginacaoNoticias(@Query() paginaNoticias: Paginas) {
    return this.noticiasService.paginacaoNoticias(paginaNoticias);
  }
}
