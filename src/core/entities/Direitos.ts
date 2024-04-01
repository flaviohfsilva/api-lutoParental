import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Tags } from './Tags';

@Index('fk_direitos_tags_idx', ['idTag'], {})
@Entity('direitos', { schema: 'lutoparental' })
export class Direitos {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'titulo', length: 255 })
  titulo: string;

  @Column('varchar', { name: 'texto', length: 1000 })
  texto: string;

  @Column('datetime', { name: 'data_hora' })
  dataHora: Date;

  @Column('int', { name: 'id_tag' })
  idTag: number;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('tinyint', { name: 'excluido', width: 1, default: () => "'0'" })
  excluido: boolean;

  @ManyToOne(() => Tags, (tags) => tags.direitos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_tag', referencedColumnName: 'id' }])
  idTag2: Tags;
}
