import { Inject, Injectable } from '@nestjs/common';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import {
  PaginaDepoimentos,
  RetornoPaginaDepoimentos,
  Retorno,
} from 'src/interfaces';
import { Repository } from 'typeorm';
import { Depoimentos } from 'src/core/entities/Depoimentos.entity';

@Injectable()
export class DepoimentosService {
  constructor(
    @Inject('DEPOIMENTOS_REPOSITORY')
    private readonly DepoimentosRP: Repository<Depoimentos>,
  ) {}

  create(createDepoimentoDto: CreateDepoimentoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Depoimento criado com sucesso!',
    };

    try {
      createDepoimentoDto.dataHora = new Date();
      const depoimento = this.DepoimentosRP.create(createDepoimentoDto);
      return this.DepoimentosRP.save(depoimento);
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = 'Erro ao criar depoimento';
    }
  }

  // =========== Buscar Depoimentos ===========
  buscarDepoimentos() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const depoimento = this.DepoimentosRP.find({
        where: { excluido: false },
      });
      return depoimento;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao buscar depoimento ${error}`;
      return retorno;
    }
  }

  // =========== Buscar Depoimentos  por id===========
  buscarDepoimentoPorId(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca por id realizada com sucesso!',
    };

    try {
      const depoimento = this.DepoimentosRP.findOne({
        where: { id: id },
      });
      return depoimento;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca por id ${error}`;
      return retorno;
    }
  }

  // =========== Atualizar Depoimentos ===========
  async atualizarDepoimento(
    id: number,
    updateDepoimentoDto: UpdateDepoimentoDto,
  ) {
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

  // =========== Excluir Depoimentos ===========
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
      return await this.DepoimentosRP.save(excluirDepoimento);
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir depoimento ${error}`;
      return retorno;
    }
  }

  // =========== Paginação Depoimentos ===========
  async paginacaoDepoimentos(paginaDepoimentos: PaginaDepoimentos) {
    try {
      let depoimentos;

      // Limite de dados por página
      const registrosPorPagina = 6;

      // Cálculo para passar de página
      const proximaPagina = (paginaDepoimentos.pagina - 1) * registrosPorPagina;

      // Identificador se vai avançar a página.
      let avancarPagina = false;

      // Identificador para voltar a página.
      let voltarPagina = false;

      const retornoPaginaDepoimentos: RetornoPaginaDepoimentos = {
        erro: false,
        msg: '',
        paginaAtual: paginaDepoimentos.pagina,
        dados: depoimentos,
        avancarPagina: avancarPagina,
        voltarPagina: voltarPagina,
      };

      depoimentos = await this.DepoimentosRP.find({
        where: {
          id: paginaDepoimentos.id,
        },
        take: registrosPorPagina + 1,
        skip: proximaPagina,
        order: { id: 'ASC' },
      });

      // Lógica para identificar e passar a página
      const passarPagina = depoimentos.length > registrosPorPagina;

      if (passarPagina) {
        avancarPagina = true;
        depoimentos.pop();
      }

      // Lógica para identificar e voltar a página
      const paginaAnterior = paginaDepoimentos.pagina - 1;

      if (paginaAnterior) {
        voltarPagina = true;
      }

      const Depoimentos: {
        titulo: string | null;
        texto: string;
        genero: string;
        estado: string;
      }[] = [];

      for (let i = 0; i < depoimentos.length; i++) {
        const historias: Depoimentos = depoimentos[i];

        Depoimentos.push({
          titulo: historias.titulo,
          texto: historias.texto,
          genero: historias.genero,
          estado: historias.estado.nome,
        });

        if (depoimentos.length === 0) {
          retornoPaginaDepoimentos.erro = true;
          retornoPaginaDepoimentos.msg =
            'Erro ao encontrar página. As páginas chegeram ao fim!';
          retornoPaginaDepoimentos.paginaAtual = paginaDepoimentos.pagina;
          retornoPaginaDepoimentos.dados = depoimentos;
          retornoPaginaDepoimentos.avancarPagina = avancarPagina;
          retornoPaginaDepoimentos.voltarPagina = voltarPagina;
          console.log({ retornoPaginaDepoimentos });
        }
        retornoPaginaDepoimentos.msg = 'Página encontrada com sucesso!';
        retornoPaginaDepoimentos.paginaAtual = paginaDepoimentos.pagina;
        retornoPaginaDepoimentos.dados = Depoimentos;
        retornoPaginaDepoimentos.avancarPagina = avancarPagina;
        retornoPaginaDepoimentos.voltarPagina = voltarPagina;
        console.log({ retornoPaginaDepoimentos });
      }
    } catch (error) {
      console.log('Erro: ', error);
    }
  }
}
