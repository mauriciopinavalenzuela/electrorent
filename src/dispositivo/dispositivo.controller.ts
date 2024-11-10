import { ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, ParseEnumPipe } from '@nestjs/common';
import { DispositivoService } from './dispositivo.service';
import { CreateDispositivoDto } from 'src/dto/create-dispositivo.dto';

@Controller('dispositivo')
export class DispositivoController {
    constructor(private readonly dispositivoService: DispositivoService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo dispositivo' })
    async createDispositivo(@Body() createDispositivoDto: CreateDispositivoDto) {
        return this.dispositivoService.create(createDispositivoDto);
    }

    @Get('/disponibles')
    @ApiOperation({ summary: 'Consultar disponibilidad de dispositivos' })
    async getDisponibles(
        @Query('categoria') categoria: string,
        @Query('estado', new ParseEnumPipe(['NUEVO', 'USADO', 'FUERA_DE_SERVICIO'])) estado: 'NUEVO' | 'USADO' | 'FUERA_DE_SERVICIO',
    ) {
        return this.dispositivoService.findDisponibles(categoria, estado);
    }
}
