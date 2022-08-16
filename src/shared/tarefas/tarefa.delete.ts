import { IPaginaFormulario } from "../interfaces/pagina.create.interface";
import { IPaginaHTML } from "../interfaces/pagina.interface";
import { IRepositorio } from "../interfaces/repositorio.interface";
import { Tarefa } from "./tarefa.model";

class TarefaDelete implements IPaginaHTML, IPaginaFormulario {
  private btnDeletar: HTMLButtonElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.btnDeletar = document.getElementById(
      "btnDeletar"
    ) as HTMLButtonElement;

    this.btnDeletar.addEventListener("click", (_evt) => this.gravarRegistros());
  }

  gravarRegistros(): void {
    //this.repositorioTarefas.excluir();

    location.reload();
  }
}
