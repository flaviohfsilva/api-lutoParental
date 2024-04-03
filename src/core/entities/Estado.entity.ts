import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Depoimentos } from './Depoimentos.entity';

@Entity('estado', { schema: 'lutoparental' })
export class Estado {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
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
