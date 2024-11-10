import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ArriendoService } from './arriendo.service';
import { CreateArriendoDto } from 'src/dto/create-arriendo.dto';

@Controller('arriendos')
export class ArriendoController {
    constructor(private readonly arriendoService: ArriendoService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo arriendo' })
    async createArriendo(@Body() createArriendoDto: CreateArriendoDto) {
        return this.arriendoService.create(createArriendoDto);
    }

    @Get('/cliente/:id')
    @ApiOperation({ summary: 'Consultar arriendos activos de un cliente específico' })
    async getArriendosActivosPorCliente(@Param('id') id: string) {
        return this.arriendoService.findActivosPorCliente(id);
    }

    @Put('/:id/devolver')
    @ApiOperation({ summary: 'Registrar la devolución de un dispositivo' })
    async devolverArriendo(@Param('id') id: string) {
        return this.arriendoService.devolverArriendo(id);
    }

    @Get()
    @ApiOperation({ summary: 'Informe de arriendos por periodo' })
    async informeArriendosPorPeriodo(
        @Query('fecha_inicio') fechaInicio: string,
        @Query('fecha_fin') fechaFin: string,
    ) {
        return this.arriendoService.informeArriendosPorPeriodo(new Date(fechaInicio), new Date(fechaFin));
    }
}
