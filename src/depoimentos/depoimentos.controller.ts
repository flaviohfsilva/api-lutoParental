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
import { DepoimentosService } from './depoimentos.service';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import { ApiTags } from '@nestjs/swagger';
import { Paginas } from 'src/interfaces';

@ApiTags('Depoimentos')
@Controller('depoimentos')
export class DepoimentosController {
  constructor(private readonly depoimentosService: DepoimentosService) {}

  @Post()
  create(@Body() createDepoimentoDto: CreateDepoimentoDto) {
    return this.depoimentosService.create(createDepoimentoDto);
  }

  @Get('buscarTodos')
  findAll() {
    return this.depoimentosService.buscarDepoimentos();
  }

  @Get('buscarPor/:id')
  findOne(@Param('id') id: string) {
    return this.depoimentosService.buscarDepoimentoPorId(+id);
  }

  @Get('validacao/:id')
  validate(@Param('id') id: number) {
    console.log('Id chegado no validate: ', id);
    return this.depoimentosService.validarDepoimento(id);
  }

  @Patch('atualizar/:id')
  update(
    @Param('id') id: string,
    @Body() updateDepoimentoDto: UpdateDepoimentoDto,
  ) {
    return this.depoimentosService.atualizarDepoimento(
      +id,
      updateDepoimentoDto,
    );
  }

  @Delete('excluir/:id')
  remove(@Param('id') id: string) {
    return this.depoimentosService.excluirDepoimento(+id);
  }

  @Get('buscarPaginas/')
  paginacaoDepoimentos(@Query() depoimentos: Paginas) {
    console.log({ depoimentos });
    return this.depoimentosService.paginacaoDepoimentos(depoimentos);
  }
}
