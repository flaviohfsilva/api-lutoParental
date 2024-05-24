import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('verificacao', { schema: 'lutoparental' })
export class Verificacao {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 500 })
  email: string;

  @Column('int', { name: 'codigo' })
  codigo: number;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('datetime', { name: 'data_hora' })
  dataHora: Date;
}
