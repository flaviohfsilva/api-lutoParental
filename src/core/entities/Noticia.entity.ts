import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './Tags.entity';

@Index('fk_noticia_tags_idx', ['idTag'], {})
@Entity('noticia', { schema: 'lutoparental' })
export class Noticia {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'titulo', length: 255 })
  titulo: string;

  @Column('varchar', { name: 'texto', nullable: true, length: 1000 })
  texto: string | null;

  @Column('datetime', { name: 'data_hora' })
  dataHora: Date;

  @Column('int', { name: 'id_tag' })
  idTag: number;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('tinyint', { name: 'excluido', width: 1, default: () => "'0'" })
  excluido: boolean;

  @Column('int', {
    name: 'id_tipo_informacao',
    default: () => "'2'",
  })
  idTipoInformacao: number;

  @Column('varchar', { name: 'img', nullable: true, length: 245 })
  img: string | null;

  @ManyToOne(() => Tags, (tags) => tags.noticias, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_tag', referencedColumnName: 'id' }])
  idTag2: Tags;
}
