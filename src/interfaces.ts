export interface Retorno {
  erro: boolean;
  mensagem: string;
  dados?: {}[] | any;
}

export interface Paginas {
  excluido: boolean;
  pagina: number;
}

export interface RetornoPaginacao {
  erro: boolean;
  msg: string;
  paginaAtual: number;
  totalPaginas: number[];
  dados: {}[];
  avancarPagina: boolean;
  voltarPagina: boolean;
}

export interface NoticiaRetorno {
  titulo: string;
  texto: string;
  tag: string;
  dataHora: string;
}
