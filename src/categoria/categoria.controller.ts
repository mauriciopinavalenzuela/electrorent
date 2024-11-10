import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';

@Controller('categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Post()
    @ApiOperation({ summary: 'Agregar una nueva categoría' })
    async createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
        return this.categoriaService.create(createCategoriaDto);
    }

    @Get()
    @ApiOperation({ summary: 'Consultar todas las categorías' })
    async getCategorias() {
        return this.categoriaService.findAll();
    }
}

