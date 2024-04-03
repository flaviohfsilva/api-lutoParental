import { PartialType } from '@nestjs/mapped-types';
import { CreateDireitoDto } from './create-direito.dto';

export class UpdateDireitoDto extends PartialType(CreateDireitoDto) {}
