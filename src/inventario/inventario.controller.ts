import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { InventarioService } from './inventario.service';
import { EstadoDispositivoDto } from '../dto/estado-dispositivo.dto';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get('/dispositivo/:id')
  @ApiOperation({ summary: 'Consultar el estado de un dispositivo en inventario' })
  async getEstadoDispositivo(@Param('id') id: string): Promise<EstadoDispositivoDto> {
    return this.inventarioService.getEstadoDispositivo(id);
  }
}
