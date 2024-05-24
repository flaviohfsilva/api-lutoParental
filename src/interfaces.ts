export interface Retorno {
  erro: boolean;
  mensagem: string;
  dados?: {}[] | any;
}

export interface Paginas {
  excluido: boolean;
  pagina: number;
  filtro: string;
  idTag?: number;
}

export interface RetornoPaginacao {
  erro: boolean;
  msg: string;
  paginaAtual: number;
  totalPaginas: number[];
  dados: object[];
  filtro: string;
  avancarPagina: boolean;
  voltarPagina: boolean;
}

export interface NoticiaRetorno {
  titulo: string;
  texto: string;
  tag: string;
  dataHora: string;
}

export interface EmailContato {
  nome: string;
  email: string;
  mensagem: string;
  isChecked: boolean;
}
