import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from '../entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService, TypeOrmModule], 
})
export class CategoriaModule {}
