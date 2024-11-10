import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Dispositivo } from './entities/dispositivo.entity';
import { Categoria } from './entities/categoria.entity';
import { Arriendo } from './entities/arriendo.entity';
import { Inventario } from './entities/inventario.entity';
import { ClienteModule } from './cliente/cliente.module';
import { DispositivoModule } from './dispositivo/dispositivo.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ArriendoModule } from './arriendo/arriendo.module';
import { InventarioModule } from './inventario/inventario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Cliente, Dispositivo, Categoria, Arriendo, Inventario],
      synchronize: true,
    }),
    ClienteModule,
    DispositivoModule,
    CategoriaModule,
    ArriendoModule,
    InventarioModule,
  ],
})
export class AppModule {}
