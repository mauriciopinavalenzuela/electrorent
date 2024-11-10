export class EstadoDispositivoDto {
    id: string;
    nombre: string;
    estado: 'DISPONIBLE' | 'ARRENDADO' | 'EN_MANTENCION';
  }
  