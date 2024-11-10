import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from '../entities/cliente.entity';
import { CreateClienteDto } from '../dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    
    if (!this.isValidRut(createClienteDto.rut)) {
      throw new BadRequestException('El RUT tiene un formato inválido');
    }

    const clienteExistente = await this.clienteRepository.findOne({
      where: { rut: createClienteDto.rut },
    });
    if (clienteExistente) {
      throw new ConflictException('El cliente con este RUT ya está registrado.');
    }

    return this.clienteRepository.save(createClienteDto);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  private isValidRut(rut: string): boolean {
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/;
    return rutRegex.test(rut);
  }
}
