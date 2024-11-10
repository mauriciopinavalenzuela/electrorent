import { IsString, IsIn } from 'class-validator';

export class CreateInventarioDto {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  @IsIn(['DISPONIBLE', 'ARRENDADO', 'EN_MANTENCION'], {
    message: 'El estado debe ser DISPONIBLE, ARRENDADO o EN_MANTENCION',
  })
  estado: 'DISPONIBLE' | 'ARRENDADO' | 'EN_MANTENCION';
}
