import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Depoimentos } from './Depoimentos';
import { Direitos } from './Direitos';
import { Noticia } from './Noticia';

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

  @OneToMany(() => Depoimentos, (depoimentos) => depoimentos.idTag2)
  depoimentos: Depoimentos[];

  @OneToMany(() => Direitos, (direitos) => direitos.idTag2)
  direitos: Direitos[];

  @OneToMany(() => Noticia, (noticia) => noticia.idTag2)
  noticias: Noticia[];
}
