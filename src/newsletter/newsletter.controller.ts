import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { ApiTags } from '@nestjs/swagger';
import { EmailContato } from 'src/interfaces';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @Get()
  findAll() {
    return this.newsletterService.findAll();
  }

  @Get('enviar/:nome/:email')
  enviarEmail(@Param('nome') nome: string, @Param('email') email: string) {
    return this.newsletterService.enviarEmail(nome, email);
  }

  @Get('enviarVerificadorQrCode/:nome/:email')
  verificador(@Param('nome') nome: string, @Param('email') email: string) {
    return this.newsletterService.verificarQrCode(nome, email);
  }

  @Get('verificarCodigo/:codigo/:email')
  verificaCodigo(
    @Param('codigo') codigo: number,
    @Param('email') email: string,
  ) {
    return this.newsletterService.verificarCodigo(codigo, email);
  }

  @Post('receber/')
  receberEmail(@Body() emailContato: EmailContato) {
    return this.newsletterService.receberEmail(emailContato);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.newsletterService.remove(+id);
  }
}
