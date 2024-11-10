import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Dispositivo)
  dispositivo: Dispositivo;

  @Column({ type: 'enum', enum: ['DISPONIBLE', 'ARRENDADO', 'EN_MANTENCION'] })
  estado: 'DISPONIBLE' | 'ARRENDADO' | 'EN_MANTENCION';
}
