import { Inject, Injectable } from '@nestjs/common';
import { CreateDireitoDto } from './dto/create-direito.dto';
import { UpdateDireitoDto } from './dto/update-direito.dto';
import { Repository } from 'typeorm';
import { Direitos } from 'src/core/entities/Direitos.entity';
import { Retorno } from 'src/interfaces';

@Injectable()
export class DireitosService {
  constructor(
    @Inject('DIREITOS_REPOSITORY')
    private readonly DireitosRP: Repository<Direitos>,
  ) {}
  create(createDireitoDto: CreateDireitoDto) {
    const direitos = this.DireitosRP.create(createDireitoDto);
    return this.DireitosRP.save(direitos);
  }

  buscarTodos() {
    return this.DireitosRP.find({ where: { excluido: false } });
  }

  buscarPorId(id: number) {
    return this.DireitosRP.findOne({ where: { id: id } });
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
}
