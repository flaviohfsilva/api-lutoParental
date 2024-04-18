import { Inject, Injectable } from '@nestjs/common';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { Repository } from 'typeorm';
import { Noticia } from 'src/core/entities/Noticia.entity';
import {
  NoticiaRetorno,
  Paginas,
  Retorno,
  RetornoPaginacao,
} from 'src/interfaces';

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
        paginaAtual: paginaNoticias.pagina,
        totalPaginas: [],
        dados: [],
        avancarPagina: avancarPagina,
        voltarPagina: voltarPagina,
      };

      // eslint-disable-next-line prefer-const
      noticias = await this.NoticiaRP.find({
        where: {
          excluido: paginaNoticias.excluido,
        },
        take: registrosPorPagina + 1,
        skip: proximaPagina,
        order: { id: 'ASC' },
        relations: ['idTag2'],
      });

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
      retornoPaginaNoticias.paginaAtual = paginaNoticias.pagina;
      retornoPaginaNoticias.dados = Noticias;
      retornoPaginaNoticias.avancarPagina = avancarPagina;
      retornoPaginaNoticias.voltarPagina = voltarPagina;
      console.log('Retorno da Página', retornoPaginaNoticias.dados);
      return retornoPaginaNoticias;
    } catch (error) {
      console.log('Erro: ', error);
    }
  }
}
