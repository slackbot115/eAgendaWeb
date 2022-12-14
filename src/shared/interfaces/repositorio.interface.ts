import { EntidadeBase } from "../entidade.model";

export interface IRepositorio<T extends EntidadeBase> {
  inserir(registro: T): void;
  editar(registro: T): void;
  excluir(registro: T): void;
  selecionarTodos(): T[];
}
