import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('newslatter', { schema: 'lutoparental' })
export class Newslatter {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', nullable: true, length: 255 })
  nome: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;
}
