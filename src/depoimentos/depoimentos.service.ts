import { Inject, Injectable } from '@nestjs/common';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import { Retorno } from 'src/interfaces';
import { Repository } from 'typeorm';
<<<<<<< HEAD
import { Depoimentos } from 'src/core/entities/Depoimentos.entity';
=======
import { Depoimentos } from 'src/core/entities/Depoimentos';
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64

@Injectable()
export class DepoimentosService {
  constructor(
    @Inject('DEPOIMENTOS_REPOSITORY')
<<<<<<< HEAD
    private readonly DepoimentosRP: Repository<Depoimentos>,
=======
    private readonly DepoimentosRP: Repository<Depoimentos>
>>>>>>> 769ff7e6bb78801782d6542cb8b9cb990363bc64
  ) {}

  create(createDepoimentoDto: CreateDepoimentoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Depoimento criado com sucesso!',
    };

    try {
      const depoimento = this.DepoimentosRP.create(createDepoimentoDto);
      this.DepoimentosRP.save(depoimento);
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = 'Erro ao criar depoimento';
    }
  }

  buscarDepoimentos() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const depoimento = this.DepoimentosRP.find({
        where: { excluido: false },
      });
      retorno.dados = depoimento;
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao buscar depoimento ${error}`;
      return retorno;
    }
  }

  buscarDepoimentoPorId(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca por id realizada com sucesso!',
    };

    try {
      const depoimento = this.DepoimentosRP.findOne({
        where: { id: id },
      });
      retorno.dados = depoimento;
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca por id ${error}`;
      return retorno;
    }
  }

  async atualizarDepoimento(id: number, updateDepoimentoDto: UpdateDepoimentoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Depoimento atualizado com sucesso!',
    };

    try {
      await this.DepoimentosRP.update(id, updateDepoimentoDto);
      return this.DepoimentosRP.find({ where: { id: id } });
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao atualizar Depoimento. ${error}`;
      return retorno;
    }
  }

  async excluirDepoimento(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Depoimento excluído com sucesso!',
    };

    try {
      const excluirDepoimento = await this.DepoimentosRP.findOne({
        where: { id: id },
      });
      excluirDepoimento.excluido = true;
      excluirDepoimento.ativo = false;
      await this.DepoimentosRP.save(excluirDepoimento);
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir depoimento ${error}`;
      return retorno;
    }
  }
}
