import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from '../entities/inventario.entity';
import { EstadoDispositivoDto } from '../dto/estado-dispositivo.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  async getEstadoDispositivo(id: string): Promise<EstadoDispositivoDto> {
    const dispositivoInventario = await this.inventarioRepository.findOne({
      where: { dispositivo: { id } },
      relations: ['dispositivo'],
    });

    if (!dispositivoInventario) {
      throw new NotFoundException('Dispositivo no encontrado en el inventario');
    }

    return {
      id: dispositivoInventario.dispositivo.id,
      nombre: `${dispositivoInventario.dispositivo.marca} ${dispositivoInventario.dispositivo.modelo}`, 
      estado: dispositivoInventario.estado,
    };
  }
}
