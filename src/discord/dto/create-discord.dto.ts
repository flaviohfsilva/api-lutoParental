export class CreateDiscordDto {
  id: number;
  nome?: string | null;
  titulo: string | null;
  texto: string;
  genero: string;
  img?: string;
}
