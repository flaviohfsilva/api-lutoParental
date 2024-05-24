import { Inject, Injectable } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
// import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Repository } from 'typeorm';
import { Estado } from 'src/core/entities/Estado.entity';

@Injectable()
export class EstadosService {
  constructor(
    @Inject('ESTADOS_REPOSITORY')
    private readonly EstadosRP: Repository<Estado>,
  ) {}

  create(createEstadoDto: CreateEstadoDto) {
    const estados = this.EstadosRP.create(createEstadoDto);
    return this.EstadosRP.save(estados);
  }

  buscarTodos() {
    return this.EstadosRP.find({ where: { ativo: true } });
  }

  buscarPorId(id: number) {
    return this.EstadosRP.findOne({ where: { id: id } });
  }

  async atualizarContadorEstado(idEstado: number) {
    const estado = await this.EstadosRP.findOne({
      where: {
        id: idEstado,
      },
    });

    estado.TotalCont = (estado.TotalCont || 0) + 1;
    console.log(`valor de TotalCont: ${estado.TotalCont}`);
    await this.EstadosRP.save(estado);
  }

  async decrementarTotalEstado(idEstado: number) {
    const estado = await this.EstadosRP.findOne({
      where: {
        id: idEstado,
      },
    });

    estado.TotalCont = (estado.TotalCont || 0) - 1;
    console.log(`valor de TotalCont: ${estado.TotalCont}`);
    await this.EstadosRP.save(estado);
  }


  // update(id: number, updateEstadoDto: UpdateEstadoDto) {
  //   return `This action updates a #${id} estado`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} estado`;
  // }
}
