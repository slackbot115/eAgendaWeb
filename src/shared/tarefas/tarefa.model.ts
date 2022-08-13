import { EntidadeBase } from "../entidade.model.js";
import { Prioridade } from "./prioridade.enum.js";

export class Tarefa extends EntidadeBase {
  public titulo: string;
  public prioridade: Prioridade;
  public dataDeCriacao: Date;
  public dataDeConclusao?: Date;
  public percentualConcluido: number;

  constructor(titulo: string, prioridade: Prioridade) {
    super();
    this.titulo = titulo;
    this.prioridade = prioridade;
    this.dataDeCriacao = new Date();
    this.percentualConcluido = 0;
  }
}
