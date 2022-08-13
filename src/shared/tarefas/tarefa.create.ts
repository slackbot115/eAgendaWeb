import { IPaginaFormulario } from "../interfaces/pagina.create.interface.js";
import { IPaginaHTML } from "../interfaces/pagina.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaCreate implements IPaginaHTML, IPaginaFormulario {
  private txtTitulo: HTMLInputElement;
  private radioPrioridade: HTMLInputElement;
  private btnGravar: HTMLButtonElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtTitulo = document.getElementById("txtTitulo") as HTMLInputElement;
    this.btnGravar = document.getElementById("btnGravar") as HTMLButtonElement;

    this.btnGravar.addEventListener("click", (_evt) => this.gravarRegistros());
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

    this.repositorioTarefas.inserir(tarefa);

    location.reload();
  }
}

new TarefaCreate(new TarefaRepositoryLocalStorage());
