import { EmailContato } from './../interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
// import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { Repository } from 'typeorm';
import { Newslatter } from 'src/core/entities/Newslatter.entity';
import { Retorno } from 'src/interfaces';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateVerificacaoDto } from 'src/verificacao/dto/create-verificacao.dto';
import { VerificacaoService } from 'src/verificacao/verificacao.service';

@Injectable()
export class NewsletterService {
  constructor(
    @Inject('NEWSLETTER_REPOSITORY')
    private readonly NewslatterRP: Repository<Newslatter>,
    private readonly verificacaoService: VerificacaoService,
    private mailerService: MailerService,
  ) {}

  create(createNewsletterDto: CreateNewsletterDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Inscrição feita com sucesso!',
    };

    try {
      const news = this.NewslatterRP.create(createNewsletterDto);
      this.NewslatterRP.save(news);
      return retorno;
    } catch (error) {
      retorno.erro = false;
      retorno.mensagem = `Erro ao se inscrever ${error}`;
      return retorno;
    }
  }

  enviarEmail(nome: string, email: string) {
    const mail = 'raizessdoamor@gmail.com';

    const saveNews: CreateNewsletterDto = { nome, email };

    this.create(saveNews);

    try {
      this.mailerService.sendMail({
        from: {
          name: 'Raízes do Amor',
          address: mail,
        },
        subject: 'Newsletter Raízes do Amor',
        to: {
          name: nome,
          address: email,
        },
        template: 'newsletter',
        context: {
          nome: nome,
          email: email,
        },
      });
      console.log('Newsletter enviada para: ', email);
    } catch (error) {
      console.log(error);
    }
  }

  async receberEmail(emailContato: EmailContato) {
    const { nome, email, mensagem, isChecked } = emailContato;

    console.log(nome, email, mensagem, isChecked);
    const mail = 'raizessdoamor@gmail.com';
    const raizes = 'Raízes do Amor';

    // Salva o email e o nome da pessoa que autorizou receber a newsletter
    if (isChecked) {
      const saveNews: CreateNewsletterDto = { nome, email };
      this.create(saveNews);
    }

    try {
      await this.mailerService.sendMail({
        from: {
          name: raizes,
          address: mail,
        },
        subject: `Mensagem de ${nome}`,
        to: {
          name: raizes,
          address: mail,
        },
        text: mensagem,
        replyTo: {
          name: nome,
          address: email,
        },
        template: 'receber',
        context: {
          nome: nome,
          raizes: raizes,
          email: email,
          mensagem: mensagem,
        },
      });
      console.log('Email enviado com sucesso para:', mail);
    } catch (error) {
      console.error('Erro ao receber o email:', error.message);
    }
  }

  async verificarQrCode(nome: string, email: string) {
    const mail = 'raizessdoamor@gmail.com';
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    const objVerificador: CreateVerificacaoDto = {
      email: email,
      codigo: randomCode,
      dataHora: new Date(),
    };

    // Salva no banco o código verificador o email para quem foi enviado
    this.verificacaoService.create(objVerificador);

    this.verificarCodigo(randomCode, email);

    try {
      this.mailerService.sendMail({
        from: {
          name: 'Raízes do Amor',
          address: mail,
        },
        subject: 'Verificação do QR Code',
        to: {
          name: nome,
          address: email,
        },
        replyTo: {
          name: 'Raízes do Amor',
          address: mail,
        },
        template: 'qrcode',
        context: {
          nome: nome,
          email: email,
          codigoVerificador: randomCode,
        },
      });
      console.log('Email com código de verificação enviado para: ', email);
    } catch (error) {
      console.log(error);
    }
  }

  // Busca o código verificador e envia uma validação para o front-end
  async verificarCodigo(codigo: number, email: string) {
    const verificationCode = await this.verificacaoService.findOneCode(
      codigo,
      email,
    );

    if (verificationCode) {
      await this.verificacaoService.remove(verificationCode);
      console.log('O código verificador confere!');
      return true;
    }
    console.log('O código verificador incorreto!');
    return false;
  }

  findAll() {
    return this.NewslatterRP.find();
  }

  cancelar(id: number) {
    return `This action removes a #${id} newslatter`;
  }
}
