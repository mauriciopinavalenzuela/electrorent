import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
 
    const categoriaExistente = await this.categoriaRepository.findOne({
      where: { nombre: createCategoriaDto.nombre },
    });
    if (categoriaExistente) {
      throw new ConflictException('La categoría con este nombre ya existe.');
    }

    const nuevaCategoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(nuevaCategoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }
}
