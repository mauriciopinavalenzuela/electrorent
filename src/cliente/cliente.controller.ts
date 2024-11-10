import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo cliente' })
  async createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de clientes' })
  async getAllClientes() {
    return this.clienteService.findAll();
  }
}
