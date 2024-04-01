import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './Tags';
import { Estado } from './Estado';

@Index('fk_depoimentos_tags_idx', ['idTag'], {})
@Index('fk_depoimentos_estados_idx', ['idEstado'], {})
@Entity('depoimentos', { schema: 'lutoparental' })
export class Depoimentos {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'titulo', nullable: true, length: 255 })
  titulo: string | null;

  @Column('varchar', { name: 'texto', length: 1000 })
  texto: string;

  @Column('varchar', { name: 'genero', length: 45 })
  genero: string;

  @Column('int', { name: 'id_estado' })
  idEstado: number;

  @Column('int', { name: 'id_tag' })
  idTag: number;

  @Column('datetime', { name: 'data_hora' })
  dataHora: Date;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('tinyint', { name: 'excluido', width: 1, default: () => "'0'" })
  excluido: boolean;

  @ManyToOne(() => Tags, (tags) => tags.depoimentos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_tag', referencedColumnName: 'id' }])
  idTag2: Tags;

  @ManyToOne(() => Estado, (estados) => estados.depoimentos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_estsdo', referencedColumnName: 'id' }])
  estado: Estado;
}
