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
import { DireitosService } from './direitos.service';
import { CreateDireitoDto } from './dto/create-direito.dto';
import { UpdateDireitoDto } from './dto/update-direito.dto';
import { ApiTags } from '@nestjs/swagger';
import { Paginas } from 'src/interfaces';

@ApiTags('Direitos')
@Controller('direitos')
export class DireitosController {
  constructor(private readonly direitosService: DireitosService) {}

  @Post()
  create(@Body() createDireitoDto: CreateDireitoDto) {
    return this.direitosService.create(createDireitoDto);
  }

  @Get('buscarTodos')
  findAll() {
    return this.direitosService.buscarTodos();
  }

  @Get('buscarPor/:id')
  findOne(@Param('id') id: string) {
    return this.direitosService.buscarPorId(+id);
  }

  @Patch('atualizar/:id')
  update(@Param('id') id: string, @Body() updateDireitoDto: UpdateDireitoDto) {
    return this.direitosService.atualizarDireito(+id, updateDireitoDto);
  }

  @Delete('excluir/:id')
  remove(@Param('id') id: string) {
    return this.direitosService.excluirDireito(+id);
  }

  @Get('buscarPaginas/')
  paginacaoDepoimentos(@Query() direitos: Paginas) {
    console.log({ direitos });
    return this.direitosService.paginacaoDireitos(direitos);
  }
}
