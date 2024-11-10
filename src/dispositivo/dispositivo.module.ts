import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispositivo } from '../entities/dispositivo.entity';
import { DispositivoService } from './dispositivo.service';
import { DispositivoController } from './dispositivo.controller';
import { InventarioModule } from '../inventario/inventario.module'; 
import { CategoriaModule } from '../categoria/categoria.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Dispositivo]),
    InventarioModule,
    CategoriaModule,
  ],
  providers: [DispositivoService],
  controllers: [DispositivoController],
})
export class DispositivoModule {}
