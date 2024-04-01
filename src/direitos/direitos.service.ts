import { Injectable } from '@nestjs/common';
import { CreateDireitoDto } from './dto/create-direito.dto';
import { UpdateDireitoDto } from './dto/update-direito.dto';

@Injectable()
export class DireitosService {
  create(createDireitoDto: CreateDireitoDto) {
    return 'This action adds a new direito';
  }

  findAll() {
    return `This action returns all direitos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} direito`;
  }

  update(id: number, updateDireitoDto: UpdateDireitoDto) {
    return `This action updates a #${id} direito`;
  }

  remove(id: number) {
    return `This action removes a #${id} direito`;
  }
}
