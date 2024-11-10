import { IsString, IsArray, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateArriendoDto {
  @IsString()
  @IsNotEmpty()
  clienteId: string;

  @IsArray()
  @IsNotEmpty()
  dispositivos: string[];

  @IsDateString()
  @IsNotEmpty()
  fechaArriendo: Date;
}
