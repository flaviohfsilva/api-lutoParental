import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VerificacaoService } from './verificacao.service';
import { CreateVerificacaoDto } from './dto/create-verificacao.dto';
// import { UpdateVerificacaoDto } from './dto/update-verificacao.dto';

@Controller('verificacao')
export class VerificacaoController {
  constructor(private readonly verificacaoService: VerificacaoService) {}

  @Post()
  create(@Body() createVerificacaoDto: CreateVerificacaoDto) {
    return this.verificacaoService.create(createVerificacaoDto);
  }

  @Get()
  findAll() {
    return this.verificacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verificacaoService.findOne(+id);
  }

  @Get(':codigo/:email')
  findOneCode(@Param('codigo') codigo: number, @Param('email') email: string) {
    return this.verificacaoService.findOneCode(codigo, email);
  }

  @Delete(':codigo/:email')
  async remove(@Param('codigo') codigo: number, @Param('email') email: string) {
    const verificador = await this.findOneCode(codigo, email);

    return await this.verificacaoService.remove(verificador);
  }
}
