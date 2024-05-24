import { Inject, Injectable } from '@nestjs/common';
import { CreateVerificacaoDto } from './dto/create-verificacao.dto';
import { Repository } from 'typeorm';
import { Retorno } from 'src/interfaces';
import { Verificacao } from 'src/core/entities/Verificacao.entity';

@Injectable()
export class VerificacaoService {
  constructor(
    @Inject('VERIFICACAO_REPOSITORY')
    private readonly VerificacaorRP: Repository<Verificacao>,
  ) {}

  create(createVerificacaoDto: CreateVerificacaoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Código verificador criado com sucesso!',
    };

    try {
      createVerificacaoDto.dataHora = new Date();
      const verificacao = this.VerificacaorRP.create(createVerificacaoDto);
      this.VerificacaorRP.save(verificacao);
      return retorno;
    } catch (error) {
      retorno.erro = false;
      retorno.mensagem = `Erro ao criar código verificador ${error}`;
      return retorno;
    }
  }

  findAll() {
    return this.VerificacaorRP.find();
  }

  findOne(id: number) {
    try {
      const verificacao = this.VerificacaorRP.findOne({
        where: {
          id: id,
        },
      });
      return verificacao;
    } catch (error) {
      console.log('Código verificador não existe! ', error);
    }
  }

  findOneCode(codigo: number, email: string) {
    try {
      const verificacao = this.VerificacaorRP.findOne({
        where: {
          codigo: codigo,
          email: email,
        },
      });
      return verificacao;
    } catch (error) {
      console.log('Código verificador não existe! ', error);
    }
  }

  async remove(verificationCode: Verificacao) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Código verificador excluído com sucesso!',
    };

    try {
      verificationCode.ativo = false;
      await this.VerificacaorRP.save(verificationCode);
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir código verificador! ${error}`;
      return retorno;
    }
  }
}
