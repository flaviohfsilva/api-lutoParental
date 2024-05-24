import { PartialType } from '@nestjs/swagger';
import { CreateVerificacaoDto } from './create-verificacao.dto';

export class UpdateVerificacaoDto extends PartialType(CreateVerificacaoDto) {}
