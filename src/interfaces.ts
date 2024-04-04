export interface Retorno {
  erro: boolean;
  mensagem: string;
  dados?: {}[] | any;
}

export interface PaginaDepoimentos {
  id: number;
  pagina: number;
}

export interface RetornoPaginaDepoimentos {
  erro: boolean;
  msg: string;
  paginaAtual: number;
  dados: object[];
  avancarPagina: boolean;
  voltarPagina: boolean;
}

// export interface RetornoDepoimento {
//   id: number;
//   nome: string;

// }