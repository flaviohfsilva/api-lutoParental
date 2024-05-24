import { Inject, Injectable } from '@nestjs/common';
import { CreateDireitoDto } from './dto/create-direito.dto';
import { UpdateDireitoDto } from './dto/update-direito.dto';
import { FindManyOptions, FindOptionsOrder, Repository } from 'typeorm';
import { Direitos } from 'src/core/entities/Direitos.entity';
import { Paginas, Retorno, RetornoPaginacao } from 'src/interfaces';

@Injectable()
export class DireitosService {
  constructor(
    @Inject('DIREITOS_REPOSITORY')
    private readonly DireitosRP: Repository<Direitos>,
  ) {}
  create(createDireitoDto: CreateDireitoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Direito criado com sucesso!',
    };

    try {
      createDireitoDto.dataHora = new Date();
      const direito = this.DireitosRP.create(createDireitoDto);
      this.DireitosRP.save(direito);
      return retorno;
    } catch (error) {
      retorno.erro = false;
      retorno.mensagem = `Erro ao criar direito ${error}`;
      return retorno;
    }
  }

  buscarTodos() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const direitos = this.DireitosRP.find({
        where: { excluido: false },
      });
      return direitos;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao buscar direito ${error}`;
      return retorno;
    }
  }

  buscarPorId(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca por id realizada com sucesso!',
    };

    try {
      const direito = this.DireitosRP.findOne({
        where: { id: id },
      });
      return direito;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca por id ${error}`;
      return retorno;
    }
  }

  async atualizarDireito(id: number, updateDireitoDto: UpdateDireitoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Direito atualizada com sucesso!',
    };
    try {
      await this.DireitosRP.update(id, updateDireitoDto);
      return this.DireitosRP.findOne({ where: { id: id } });
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao direito notícia! ${error}`;
      return retorno;
    }
  }

  async excluirDireito(id: number) {
    const excluirDireito = await this.DireitosRP.findOne({ where: { id: id } });

    excluirDireito.excluido = true;
    excluirDireito.ativo = false;
    return await this.DireitosRP.save(excluirDireito);
  }

  // =========== Paginação Direitos ===========
  async paginacaoDireitos(paginaDireitos: Paginas) {
    try {
      // let depoimentos;

      // Limite de dados por página
      const registrosPorPagina = 6;

      // Cálculo para passar de página
      const proximaPagina = (paginaDireitos.pagina - 1) * registrosPorPagina;

      // Identificador se vai avançar a página.
      let avancarPagina = false;

      // Identificador para voltar a página.
      let voltarPagina = false;

      const retornoPaginaDireitos: RetornoPaginacao = {
        erro: false,
        msg: '',
        filtro: '',
        paginaAtual: paginaDireitos.pagina,
        totalPaginas: [],
        dados: [],
        avancarPagina: avancarPagina,
        voltarPagina: voltarPagina,
      };

      // eslint-disable-next-line prefer-const
      let where: FindManyOptions<Direitos> = {
        where: {
          excluido: paginaDireitos.excluido,
        },
      };

      // Se existir o filtro, vai filtrar e fazer a busca no banco.
      if (paginaDireitos.filtro) {
        console.log('filtro: ', paginaDireitos.filtro);
        const filtroWhere = await this.filtroDepoimentos(paginaDireitos.filtro);
        where.order = filtroWhere;
      }

      // eslint-disable-next-line prefer-const
      let direitos = await this.DireitosRP.find({
        where: where.where,
        take: registrosPorPagina + 1,
        skip: proximaPagina,
        order: where.order,
      });

      // Lógica para identificar as páginas e mostrar no front-end
      const numeroPagina = await this.DireitosRP.count({
        where: where.where,
        order: where.order,
      });

      const totalPaginas = Math.ceil(numeroPagina / registrosPorPagina);
      // Criar um array de números de página
      const totalPaginasArray = [];
      for (let i = 1; i <= totalPaginas; i++) {
        totalPaginasArray.push(i);
      }
      console.log(totalPaginasArray);

      // Lógica para identificar e passar a página
      const passarPagina = direitos.length > registrosPorPagina;

      if (passarPagina) {
        avancarPagina = true;
        direitos.pop();
      }

      // Lógica para identificar e voltar a página
      const paginaAnterior = paginaDireitos.pagina - 1;

      if (paginaAnterior) {
        voltarPagina = true;
      }

      const Direitos: {
        id: number;
        titulo: string | null;
        texto: string;
        dataHora: string;
        img: string;
      }[] = [];

      for (let i = 0; i < direitos.length; i++) {
        const direito: Direitos = direitos[i];

        Direitos.push({
          id: direito.id,
          titulo: direito.titulo,
          texto: direito.texto,
          dataHora: direito.dataHora.toLocaleString(),
          img: direito.img,
        });
      }

      if (direitos.length === 0) {
        retornoPaginaDireitos.erro = true;
        retornoPaginaDireitos.msg =
          'Erro ao encontrar página. As páginas chegeram ao fim!';
        retornoPaginaDireitos.paginaAtual = paginaDireitos.pagina;
        retornoPaginaDireitos.totalPaginas = totalPaginasArray;
        retornoPaginaDireitos.dados = direitos;
        retornoPaginaDireitos.avancarPagina = avancarPagina;
        retornoPaginaDireitos.voltarPagina = voltarPagina;
        console.log({ retornoPaginaDireitos });
        return retornoPaginaDireitos;
      }

      retornoPaginaDireitos.msg = 'Página encontrada com sucesso!';
      retornoPaginaDireitos.paginaAtual = paginaDireitos.pagina;
      retornoPaginaDireitos.totalPaginas = totalPaginasArray;
      retornoPaginaDireitos.dados = Direitos;
      retornoPaginaDireitos.avancarPagina = avancarPagina;
      retornoPaginaDireitos.voltarPagina = voltarPagina;
      console.log('Retorno da Página', retornoPaginaDireitos.dados);
      return retornoPaginaDireitos;
    } catch (error) {
      console.log('Erro: ', error);
    }
  }

  async filtroDepoimentos(filtro: string) {
    try {
      let consulta: FindOptionsOrder<Direitos>;

      switch (filtro) {
        case 'Mais Recentes':
          consulta = {
            dataHora: 'DESC',
          };
          break;
        case 'Mais Antigos':
          consulta = {
            dataHora: 'ASC',
          };
          break;
        default:
          break;
      }

      return consulta;
    } catch (error) {
      throw new Error('Erro ao filtrar os direitos: ' + error.message);
    }
  }
}
