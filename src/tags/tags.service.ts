import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tags } from 'src/core/entities/Tags.entity';
import { Repository } from 'typeorm';
import { Retorno } from 'src/interfaces';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAGS_REPOSITORY')
    private readonly TagsRP: Repository<Tags>,
  ) {}

  create(createTagDto: CreateTagDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Tag criada com sucesso!',
    };

    try {
      const tag = this.TagsRP.create(createTagDto);
      console.log(tag);
      this.TagsRP.save(tag);
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao criar tag. ${error}`;
      return retorno;
    }
  }

  buscarTodasTags() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const tags = this.TagsRP.find({ where: { excluido: false } });
      return tags;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca! ${error}`;
      return retorno;
    }
  }

  buscarTagPorId(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca por id realizada com sucesso!',
    };

    try {
      const tags = this.TagsRP.findOne({ where: { id: id } });
      return tags;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca por id! ${error}`;
      return retorno;
    }
  }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return `This action updates a #${id} tag`;
  // }

  async remove(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Tag removida com sucesso!',
    };

    try {
      const excluirTag = await this.TagsRP.findOne({ where: { id: id } });

      excluirTag.excluido = true;
      excluirTag.ativo = false;
      await this.TagsRP.save(excluirTag);
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir tag! ${error}`;
      return retorno;
    }
  }
}
