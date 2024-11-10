import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arriendo } from '../entities/arriendo.entity';
import { CreateArriendoDto } from 'src/dto/create-arriendo.dto';
import { Cliente } from '../entities/cliente.entity';
import { Dispositivo } from '../entities/dispositivo.entity';
import { Inventario } from '../entities/inventario.entity';

@Injectable()
export class ArriendoService {
  constructor(
    @InjectRepository(Arriendo)
    private readonly arriendoRepository: Repository<Arriendo>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) { }

  async create(createArriendoDto: CreateArriendoDto) {
    const cliente = await this.clienteRepository.findOne({ where: { id: Number(createArriendoDto.clienteId) } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const arriendoExistente = await this.arriendoRepository.findOne({
      where: { cliente, fechaInicio: createArriendoDto.fechaArriendo },
    });
    if (arriendoExistente) {
      throw new BadRequestException(`El cliente ya tiene un arriendo en la fecha ${createArriendoDto.fechaArriendo}`);
    }

    const dispositivos = await this.dispositivoRepository.findByIds(createArriendoDto.dispositivos);
    if (dispositivos.length !== createArriendoDto.dispositivos.length) {
      throw new NotFoundException('Uno o más dispositivos no encontrados');
    }

    for (const dispositivo of dispositivos) {
      const inventario = await this.inventarioRepository.findOne({ where: { dispositivo } });
      if (!inventario) {
        throw new NotFoundException(`Inventario no encontrado para el dispositivo con ID ${dispositivo.id}`);
      }

      if (inventario.estado === 'EN_MANTENCION') {
        throw new BadRequestException(`El dispositivo con ID ${dispositivo.id} está en mantenimiento`);
      } else if (inventario.estado === 'ARRENDADO') {
        throw new BadRequestException(`El dispositivo con ID ${dispositivo.id} ya está arrendado`);
      } else if (inventario.estado !== 'DISPONIBLE') {
        throw new BadRequestException(`Por favor, elija productos que estén DISPONIBLES. El dispositivo con ID ${dispositivo.id} no está disponible para arriendo`);
      }
    }

    for (const dispositivo of dispositivos) {
      const inventario = await this.inventarioRepository.findOne({ where: { dispositivo } });
      inventario.estado = 'ARRENDADO';
      await this.inventarioRepository.save(inventario);
    }

    const nuevoArriendo = this.arriendoRepository.create({
      cliente,
      dispositivos,
      fechaInicio: createArriendoDto.fechaArriendo,
      fechaFin: null,
      costoTotal: 0,
      devuelto: false,  
    });

    return this.arriendoRepository.save(nuevoArriendo);
  }

  async findActivosPorCliente(clienteId: string) {
  
    const arriendosActivos = await this.arriendoRepository.find({
      where: { cliente: { id: Number(clienteId) }, fechaFin: null, devuelto: false },
      relations: ['cliente', 'dispositivos'],
    });

    if (arriendosActivos.length > 0) {
      return arriendosActivos;
    }
  
    const arriendosDevueltos = await this.arriendoRepository.find({
      where: { cliente: { id: Number(clienteId) }, devuelto: true },
      relations: ['cliente', 'dispositivos'],
    });

    if (arriendosDevueltos.length > 0) {
      return { message: `El cliente con ID ${clienteId} ya ha devuelto todos sus dispositivos arrendados.` };
    }
  
  
    return { message: `El cliente con ID ${clienteId} no tiene arriendos registrados.` };
  }
  
  async devolverArriendo(id: string) {
    const arriendo = await this.arriendoRepository.findOne({ where: { id }, relations: ['dispositivos'] });
    if (!arriendo) throw new NotFoundException('Arriendo no encontrado');

    arriendo.fechaFin = new Date();
    arriendo.devuelto = true;  

    for (const dispositivo of arriendo.dispositivos) {
      const inventario = await this.inventarioRepository.findOne({ where: { dispositivo } });
      if (inventario) {
        inventario.estado = 'DISPONIBLE';
        await this.inventarioRepository.save(inventario);
      }
    }

    await this.arriendoRepository.save(arriendo);
    return { message: 'Arriendo devuelto correctamente', arriendo };
  }

  async findArriendoById(id: string) {
    const arriendo = await this.arriendoRepository.findOne({ where: { id }, relations: ['cliente', 'dispositivos'] });
    if (!arriendo) throw new NotFoundException('Arriendo no encontrado');
    
    if (arriendo.devuelto) {
      return { message: `El cliente ya devolvió este arriendo con ID ${id}` };
    }
  
    return arriendo;
  }
  
  async informeArriendosPorPeriodo(fechaInicio: Date, fechaFin: Date) {
    const arriendos = await this.arriendoRepository.createQueryBuilder('arriendo')
      .leftJoinAndSelect('arriendo.cliente', 'cliente')
      .leftJoinAndSelect('arriendo.dispositivos', 'dispositivo')
      .where('arriendo.fechaInicio >= :fechaInicio', { fechaInicio })
      .andWhere('arriendo.fechaInicio <= :fechaFin', { fechaFin })
      .orderBy('arriendo.fechaInicio', 'DESC')
      .addOrderBy('arriendo.fechaFin', 'DESC')
      .addOrderBy('cliente.rut', 'ASC')
      .getMany();

    return arriendos;
  }
}
