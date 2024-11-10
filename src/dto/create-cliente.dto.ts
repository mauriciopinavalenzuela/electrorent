import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty({ message: 'El RUT es obligatorio' })
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/, { message: 'El RUT debe tener un formato válido (12.345.678-9)' })
  rut: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsEmail({}, { message: 'El correo debe tener un formato válido' })
  correo: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  direccion: string;
}
