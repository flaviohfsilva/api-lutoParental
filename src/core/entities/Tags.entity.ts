import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Depoimentos } from './Depoimentos.entity';
import { Direitos } from './Direitos.entity';
import { Noticia } from './Noticia.entity';

@Entity('tags', { schema: 'lutoparental' })
export class Tags {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 45 })
  nome: string;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('tinyint', { name: 'excluido', width: 1, default: () => "'0'" })
  excluido: boolean;

  @OneToMany(() => Direitos, (direitos) => direitos.idTag2)
  direitos: Direitos[];

  @OneToMany(() => Noticia, (noticia) => noticia.idTag2)
  noticias: Noticia[];
}
