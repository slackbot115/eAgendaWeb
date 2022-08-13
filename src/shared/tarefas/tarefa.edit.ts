import { IPaginaFormulario } from "../interfaces/pagina.create.interface";
import { IPaginaHTML } from "../interfaces/pagina.interface";
import { IRepositorio } from "../interfaces/repositorio.interface";
import { Prioridade } from "./prioridade.enum";
import { Tarefa } from "./tarefa.model";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage";

class TarefaEdit implements IPaginaHTML, IPaginaFormulario {
  private txtTitulo: HTMLInputElement;
  private radioPrioridade: HTMLInputElement;
  private btnEditar: HTMLButtonElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtTitulo = document.getElementById("txtTitulo") as HTMLInputElement;
    this.btnEditar = document.getElementById("btnGravar") as HTMLButtonElement;

    this.btnEditar.addEventListener("click", (_evt) => this.gravarRegistros());
  }

  gravarRegistros(): void {
    if (this.txtTitulo.value === "") {
      alert("Preencha o campo título");
      return;
    }

    this.radioPrioridade = document.querySelector(
      'input[type="radio"]:checked'
    ) as HTMLInputElement;

    const prioridade = this.radioPrioridade.value as Prioridade;

    const tarefa = new Tarefa(this.txtTitulo.value, prioridade);

    this.repositorioTarefas.editar(tarefa);

    location.reload();
  }
}

new TarefaEdit(new TarefaRepositoryLocalStorage());
