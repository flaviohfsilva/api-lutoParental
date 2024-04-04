export class CreateDepoimentoDto {
  nome: string | null;
  titulo: string | null;
  texto: string;
  genero: string;
  idEstado: number;
  dataHora: Date;
  // img: Buffer | null;
}
