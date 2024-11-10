import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Dispositivo } from './dispositivo.entity';

@Entity()
export class Arriendo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @ManyToMany(() => Dispositivo)
  @JoinTable()
  dispositivos: Dispositivo[];

  @Column({ type: 'timestamp' })
  fechaInicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaFin: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  costoTotal: number;

  @Column({ default: false })
  devuelto: boolean;
}
