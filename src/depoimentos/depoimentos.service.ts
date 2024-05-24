import { Inject, Injectable } from '@nestjs/common';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import { Retorno, Paginas, RetornoPaginacao } from 'src/interfaces';
import { Repository, FindManyOptions, FindOptionsOrder } from 'typeorm';
import { Depoimentos } from 'src/core/entities/Depoimentos.entity';
import { DiscordClient } from 'src/discord/discord.client';
import { EstadosService } from 'src/estados/estados.service';

@Injectable()
export class DepoimentosService {
  constructor(
    @Inject('DEPOIMENTOS_REPOSITORY')
    private readonly DepoimentosRP: Repository<Depoimentos>,
    private estadoService: EstadosService,
    public readonly discordClient: DiscordClient,
  ) {}

  async create(createDepoimentoDto: CreateDepoimentoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Depoimento criado com sucesso!',
    };

    try {
      createDepoimentoDto.dataHora = new Date();
      console.log({ createDepoimentoDto });
      const depoimento = this.DepoimentosRP.create(createDepoimentoDto);
      const historias = await this.DepoimentosRP.save(depoimento);
      console.log('Histórias: ', historias);

      await this.discordClient.enviarDepoimento({
        id: historias.id,
        nome: historias.nome,
        titulo: historias.titulo,
        texto: historias.texto,
        genero: historias.genero,
      });

      return historias;
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
        relations: ['estado'],
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

      // Decrementa o contador de histórias do depoimentos
      this.estadoService.decrementarTotalEstado(excluirDepoimento.idEstado);

      return await this.DepoimentosRP.save(excluirDepoimento);
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir depoimento ${error}`;
      return retorno;
    }
  }

  async excluirDepoimentoBanco(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Depoimento excluído com sucesso!',
    };

    try {
      const excluirDepoimento = await this.DepoimentosRP.findOne({
        where: { id: id },
      });
      return await this.DepoimentosRP.remove(excluirDepoimento);
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir depoimento ${error}`;
      return retorno;
    }
  }

  // =========== Paginação Depoimentos ===========
  async paginacaoDepoimentos(paginaDepoimentos: Paginas) {
    try {
      // let depoimentos;

      // Limite de dados por página
      const registrosPorPagina = 6;

      // Cálculo para passar de página
      const proximaPagina = (paginaDepoimentos.pagina - 1) * registrosPorPagina;

      // Identificador se vai avançar a página.
      let avancarPagina = false;

      // Identificador para voltar a página.
      let voltarPagina = false;

      const retornoPaginaDepoimentos: RetornoPaginacao = {
        erro: false,
        msg: '',
        filtro: '',
        paginaAtual: paginaDepoimentos.pagina,
        totalPaginas: [],
        dados: [],
        avancarPagina: avancarPagina,
        voltarPagina: voltarPagina,
      };

      // eslint-disable-next-line prefer-const
      let where: FindManyOptions<Depoimentos> = {
        where: {
          excluido: paginaDepoimentos.excluido,
        },
      };

      // Se existir o filtro, vai filtrar e fazer a busca no banco.
      if (paginaDepoimentos.filtro) {
        console.log('filtro: ', paginaDepoimentos.filtro);
        const filtroWhere = await this.filtroDepoimentos(
          paginaDepoimentos.filtro,
        );
        where.order = filtroWhere;
      }

      // eslint-disable-next-line prefer-const
      let depoimentos = await this.DepoimentosRP.find({
        where: where.where,
        take: registrosPorPagina + 1,
        skip: proximaPagina,
        order: where.order,
        relations: ['estado'],
      });

      // Lógica para identificar as páginas e mostrar no front-end
      const numeroPagina = await this.DepoimentosRP.count({
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
        id: number;
        titulo: string | null;
        texto: string;
        dataHora: string;
        estado: string;
      }[] = [];

      for (let i = 0; i < depoimentos.length; i++) {
        const historias: Depoimentos = depoimentos[i];

        Depoimentos.push({
          id: historias.id,
          titulo: historias.titulo,
          texto: historias.texto,
          dataHora: historias.dataHora.toLocaleString(),
          estado: historias.estado?.nome,
        });
      }

      if (depoimentos.length === 0) {
        retornoPaginaDepoimentos.erro = true;
        retornoPaginaDepoimentos.msg =
          'Erro ao encontrar página. As páginas chegeram ao fim!';
        retornoPaginaDepoimentos.paginaAtual = paginaDepoimentos.pagina;
        retornoPaginaDepoimentos.totalPaginas = totalPaginasArray;
        retornoPaginaDepoimentos.dados = depoimentos;
        retornoPaginaDepoimentos.avancarPagina = avancarPagina;
        retornoPaginaDepoimentos.voltarPagina = voltarPagina;
        console.log({ retornoPaginaDepoimentos });
        return retornoPaginaDepoimentos;
      }

      retornoPaginaDepoimentos.msg = 'Página encontrada com sucesso!';
      retornoPaginaDepoimentos.paginaAtual = paginaDepoimentos.pagina;
      retornoPaginaDepoimentos.totalPaginas = totalPaginasArray;
      retornoPaginaDepoimentos.dados = Depoimentos;
      retornoPaginaDepoimentos.avancarPagina = avancarPagina;
      retornoPaginaDepoimentos.voltarPagina = voltarPagina;
      console.log('Retorno da Página', retornoPaginaDepoimentos.dados);
      return retornoPaginaDepoimentos;
    } catch (error) {
      console.log('Erro: ', error);
    }
  }

  // =========== Validação Depoimentos ===========
  async validarDepoimento(id: number) {
    console.log('Chegou no validarDepoimento');
    try {
      const depoimento = await this.DepoimentosRP.findOne({
        where: {
          id,
        },
      });
      if (depoimento) {
        depoimento.ativo = true;
        this.estadoService.atualizarContadorEstado(depoimento.idEstado);
        this.DepoimentosRP.save(depoimento);
      }
    } catch (error) {
      console.error('Erro ao validar: ', error);
    }
  }

  ordenarDepoimentos(depoimentos: Depoimentos[]) {
    return depoimentos.sort((a, b) => {
      if (a.dataHora > b.dataHora) return 1;
      if (a.dataHora < b.dataHora) return -1;
      return 0;
    });
  }

  async filtroDepoimentos(filtro: string) {
    try {
      let consulta: FindOptionsOrder<Depoimentos>;

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
      throw new Error('Erro ao filtrar notícias e artigos: ' + error.message);
    }
  }
}
