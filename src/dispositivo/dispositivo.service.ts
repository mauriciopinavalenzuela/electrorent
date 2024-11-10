import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispositivo } from '../entities/dispositivo.entity';
import { Categoria } from '../entities/categoria.entity';
import { Inventario } from '../entities/inventario.entity';
import { CreateDispositivoDto } from '../dto/create-dispositivo.dto';

@Injectable()
export class DispositivoService {
  constructor(
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) { }

  async create(createDispositivoDto: CreateDispositivoDto): Promise<Dispositivo> {

    const dispositivoExistente = await this.dispositivoRepository.findOne({
      where: { codigo: createDispositivoDto.codigo },
    });
    if (dispositivoExistente) {
      throw new ConflictException('El dispositivo con este código ya existe.');
    }

    const categoria = await this.categoriaRepository.findOne({
      where: { nombre: createDispositivoDto.nombre_categoria },
    });
    if (!categoria) {
      throw new BadRequestException('La categoría especificada no existe.');
    }

    const nuevoDispositivo = this.dispositivoRepository.create({
      ...createDispositivoDto,
      categoria,
    });
    const dispositivoGuardado = await this.dispositivoRepository.save(nuevoDispositivo);

    let estadoInventario: 'DISPONIBLE' | 'EN_MANTENCION';
    switch (createDispositivoDto.estado) {
      case 'NUEVO':
      case 'USADO':
        estadoInventario = 'DISPONIBLE';
        break;
      case 'FUERA_DE_SERVICIO':
        estadoInventario = 'EN_MANTENCION'; 
        break;
      default:
        throw new BadRequestException('Estado de dispositivo no válido');
    }

    const nuevoInventario = this.inventarioRepository.create({
      dispositivo: dispositivoGuardado,
      estado: estadoInventario,
    });
    await this.inventarioRepository.save(nuevoInventario);

    return dispositivoGuardado;
  }

  async findDisponibles(categoria: string, estado: 'NUEVO' | 'USADO' | 'FUERA_DE_SERVICIO'): Promise<Dispositivo[]> {
    return this.dispositivoRepository.find({
      where: {
        categoria: { nombre: categoria },
        estado: estado,
      },
      relations: ['categoria'],
    });
  }
}
