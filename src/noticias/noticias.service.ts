import { Inject, Injectable } from '@nestjs/common';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import {
  FindManyOptions,
  Repository,
  FindOptionsOrder,
  FindOptionsWhere,
} from 'typeorm';
import { Noticia } from 'src/core/entities/Noticia.entity';
import { Paginas, Retorno, RetornoPaginacao } from 'src/interfaces';

@Injectable()
export class NoticiasService {
  constructor(
    @Inject('NOTICIA_REPOSITORY')
    private readonly NoticiaRP: Repository<Noticia>,
  ) {}

  // =========== Criar Notícia ===========
  create(createNoticiaDto: CreateNoticiaDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Notícia criada com sucesso!',
    };

    try {
      createNoticiaDto.dataHora = new Date();
      const noticia = this.NoticiaRP.create(createNoticiaDto);
      this.NoticiaRP.save(noticia);
      return retorno;
    } catch (error) {
      retorno.erro = false;
      retorno.mensagem = `Erro ao criar notícia ${error}`;
      return retorno;
    }
  }

  // =========== Buscar todas as notícias ===========
  async buscarTodasNoticias() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const noticia = await this.NoticiaRP.find({
        where: { excluido: false },
        relations: ['idTag2'],
      });

      return noticia;

      // for (let index = 0; index < noticia.length; index++) {
      //   const element = noticia[index];

      //   const teste: CreateNoticiaDto = {
      //     titulo: element.titulo,
      //     texto: element.texto.toString(),
      //     dataHora: element.dataHora,
      //     idTag: element.idTag,
      //   };
      //   console.log(element.texto.toString);
      //   return teste;
      // }
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca! ${error}`;
      return retorno;
    }
  }

  // =========== Buscar notícia por id ===========
  buscarNoticiaPorId(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada por id com sucesso!',
    };

    try {
      const noticia = this.NoticiaRP.findOne({ where: { id: id } });
      return noticia;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca por id! ${error}`;
      return retorno;
    }
  }

  // =========== Atualizar notícia ===========
  async atualizarNoticia(id: number, updateNoticiaDto: UpdateNoticiaDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Notícia atualizada com sucesso!',
    };
    try {
      await this.NoticiaRP.update(id, updateNoticiaDto);
      return this.NoticiaRP.findOne({ where: { id: id } });
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao atualizar notícia! ${error}`;
      return retorno;
    }
  }

  // =========== Excluir notícia ===========
  async excluirNoticia(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Notícia atualizada com sucesso!',
    };

    try {
      const excluirNoticia = await this.NoticiaRP.findOne({
        where: { id: id },
      });

      excluirNoticia.excluido = true;
      excluirNoticia.ativo = false;
      return await this.NoticiaRP.save(excluirNoticia);
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir notícia! ${error}`;
    }
  }

  async paginacaoNoticias(paginaNoticias: Paginas) {
    try {
      let noticias;

      // Limite de dados por página
      const registrosPorPagina = 6;

      // Cálculo para passar de página
      const proximaPagina = (paginaNoticias.pagina - 1) * registrosPorPagina;

      // Identificador se vai avançar a página.
      let avancarPagina = false;

      // Identificador para voltar a página.
      let voltarPagina = false;

      const retornoPaginaNoticias: RetornoPaginacao = {
        erro: false,
        msg: '',
        filtro: '',
        paginaAtual: paginaNoticias.pagina,
        totalPaginas: [],
        dados: [],
        avancarPagina: avancarPagina,
        voltarPagina: voltarPagina,
      };

      const where: FindManyOptions<Noticia> = {
        where: {
          excluido: paginaNoticias.excluido,
        },
      };

      if (paginaNoticias.filtro) {
        const filtroWhere = await this.filtroMuralNoticiasArtigos(
          paginaNoticias.excluido,
          paginaNoticias.filtro,
        );

        const filterOrder = await this.filtroByOrder(paginaNoticias.filtro);

        where.order = filterOrder;
        where.where = filtroWhere;

        console.log(paginaNoticias.filtro);
        console.log(where.order);
      }

      // eslint-disable-next-line prefer-const
      noticias = await this.NoticiaRP.find({
        where: where.where,
        take: registrosPorPagina + 1,
        skip: proximaPagina,
        order: where.order,
        relations: ['idTag2'],
      });

      // Lógica para identificar as páginas e mostrar no front-end
      const numeroPagina = await this.NoticiaRP.count({
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
      const passarPagina = noticias.length > registrosPorPagina;

      if (passarPagina) {
        avancarPagina = true;
        noticias.pop();
      }

      // Lógica para identificar e voltar a página
      const paginaAnterior = paginaNoticias.pagina - 1;

      if (paginaAnterior) {
        voltarPagina = true;
      }

      const Noticias: {
        id: number;
        titulo: string | null;
        texto: string;
        dataHora: string;
        idTag: number;
        img: string;
      }[] = [];

      for (let i = 0; i < noticias.length; i++) {
        const notices: Noticia = noticias[i];

        Noticias.push({
          id: notices.id,
          titulo: notices.titulo,
          texto: notices.texto,
          dataHora: notices.dataHora.toLocaleDateString('pt-BR'),
          idTag: notices.idTag,
          img: notices.img,
        });
      }

      if (noticias.length === 0) {
        retornoPaginaNoticias.erro = true;
        retornoPaginaNoticias.msg =
          'Erro ao encontrar página. As páginas chegeram ao fim!';
        retornoPaginaNoticias.paginaAtual = paginaNoticias.pagina;
        retornoPaginaNoticias.dados = noticias;
        retornoPaginaNoticias.avancarPagina = avancarPagina;
        retornoPaginaNoticias.voltarPagina = voltarPagina;
        console.log({ retornoPaginaNoticias });
        return retornoPaginaNoticias;
      }

      retornoPaginaNoticias.msg = 'Página encontrada com sucesso!';
      retornoPaginaNoticias.filtro = paginaNoticias.filtro;
      retornoPaginaNoticias.paginaAtual = paginaNoticias.pagina;
      retornoPaginaNoticias.totalPaginas = totalPaginasArray;
      retornoPaginaNoticias.dados = Noticias;
      retornoPaginaNoticias.avancarPagina = avancarPagina;
      retornoPaginaNoticias.voltarPagina = voltarPagina;
      console.log('Retorno da Página', retornoPaginaNoticias.dados);
      return retornoPaginaNoticias;
    } catch (error) {
      console.log('Erro: ', error);
    }
  }

  async filtroMuralNoticiasArtigos(excluido: boolean, filtro: string) {
    try {
      let consulta: FindOptionsWhere<Noticia>;
      const idNoticia = 1;
      const idArtigo = 2;

      switch (filtro) {
        case 'Notícias':
          consulta = {
            idTag: idNoticia,
          };
          break;

        case 'Artigos':
          consulta = {
            idTag: idArtigo,
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

  async filtroByOrder(filtro: string) {
    let consulta: FindOptionsOrder<Noticia>;

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
  }
  catch(error) {
    throw new Error('Erro ao filtrar notícias e artigos: ' + error.message);
  }
}
