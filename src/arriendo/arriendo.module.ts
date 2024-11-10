import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArriendoService } from './arriendo.service';
import { ArriendoController } from './arriendo.controller';
import { Arriendo } from '../entities/arriendo.entity';
import { Cliente } from '../entities/cliente.entity';
import { Dispositivo } from '../entities/dispositivo.entity';
import { Inventario } from '../entities/inventario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Arriendo, Cliente, Dispositivo, Inventario]) 
  ],
  providers: [ArriendoService],
  controllers: [ArriendoController],
  exports: [ArriendoService],
})
export class ArriendoModule {}
