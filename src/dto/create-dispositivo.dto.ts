import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateDispositivoDto {
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @IsString()
  codigo: string;

  @IsNotEmpty({ message: 'La marca es obligatoria' })
  @IsString()
  marca: string;

  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  @IsString()
  modelo: string;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @Matches(/^(NUEVO|USADO|FUERA_DE_SERVICIO)$/, { message: 'El estado debe ser NUEVO, USADO o FUERA_DE_SERVICIO' })
  estado: 'NUEVO' | 'USADO' | 'FUERA_DE_SERVICIO';

  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsString()
  nombre_categoria: string;
}
