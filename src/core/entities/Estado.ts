import { Column, Entity, OneToMany } from 'typeorm';
import { Depoimentos } from './Depoimentos';

@Entity('estado', { schema: 'lutoparental' })
export class Estado {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 45 })
  nome: string;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('int', { primary: true, name: 'total_cont' })
  TotalCont: number;

  @OneToMany(() => Depoimentos, (depoimentos) => depoimentos.estado)
  depoimentos: Depoimentos[];
}
