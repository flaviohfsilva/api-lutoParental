import { Inject, Injectable } from '@nestjs/common';
import { CreateDireitoDto } from './dto/create-direito.dto';
import { UpdateDireitoDto } from './dto/update-direito.dto';
import { Repository } from 'typeorm';
import { Direitos } from 'src/core/entities/Direitos';

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

  async update(id: number, updateDireitoDto: UpdateDireitoDto) {
    await this.DireitosRP.update(id, updateDireitoDto);
    return this.DireitosRP.findOne({ where: { id: id } });
  }

  async excluirDireito(id: number) {
    const excluir = await this.DireitosRP.findOne({ where: { id: id } });
    excluir.excluido = true;
    excluir.ativo = false;
    await this.DireitosRP.save(excluir);
  }
}
