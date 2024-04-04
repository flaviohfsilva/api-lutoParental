import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './Tags.entity';
import { Estado } from './Estado.entity';

@Index('fk_depoimentos_estados_idx', ['idEstado'], {})
@Entity('depoimentos', { schema: 'lutoparental' })
export class Depoimentos {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'titulo', nullable: true, length: 255 })
  titulo: string | null;

  @Column('varchar', { name: 'nome', nullable: true, length: 255 })
  nome: string | null;

  @Column('varchar', { name: 'texto', length: 1000 })
  texto: string;

  @Column('varchar', { name: 'genero', length: 45 })
  genero: string;

  @Column('int', { name: 'id_estado' })
  idEstado: number;

  @Column('datetime', { name: 'data_hora' })
  dataHora: Date;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('tinyint', { name: 'excluido', width: 1, default: () => "'0'" })
  excluido: boolean;

  @Column('int', {
    name: 'id_tipo_informacao',
    default: () => "'1'",
  })
  idTipoInformacao: number;

  @Column('blob', { name: 'img', nullable: true })
  img: Buffer | null;

  @JoinColumn([{ name: 'id_tag', referencedColumnName: 'id' }])
  idTag2: Tags;

  @ManyToOne(() => Estado, (estados) => estados.depoimentos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_estsdo', referencedColumnName: 'id' }])
  estado: Estado;
}
