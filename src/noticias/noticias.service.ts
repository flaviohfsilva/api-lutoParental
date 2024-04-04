import { Inject, Injectable } from '@nestjs/common';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { Repository } from 'typeorm';
import { Noticia } from 'src/core/entities/Noticia.entity';
import { Retorno } from 'src/interfaces';

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
  buscarTodasNoticias() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const noticia = this.NoticiaRP.find({ where: { excluido: false } });
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
}
