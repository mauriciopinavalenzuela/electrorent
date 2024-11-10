import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from './categoria.entity';

@Entity()
export class Dispositivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  codigo: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column({ type: 'enum', enum: ['NUEVO', 'USADO', 'FUERA_DE_SERVICIO'] })
  estado: 'NUEVO' | 'USADO' | 'FUERA_DE_SERVICIO';

  @ManyToOne(() => Categoria)
  categoria: Categoria;
}
