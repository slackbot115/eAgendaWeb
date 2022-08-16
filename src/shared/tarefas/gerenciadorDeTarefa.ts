import { IPaginaHTML } from "../interfaces/pagina.interface.js";
import { IPaginaListagem } from "../interfaces/pagina.list.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class GerenciadorDeTarefa implements IPaginaHTML, IPaginaListagem {
  tbTarefa: HTMLTableElement;
  btnEditarModal: HTMLButtonElement;
  btnExcluirModal: HTMLButtonElement;

  txtTituloModalEditar: HTMLInputElement;
  radioPrioridadeAlta: HTMLInputElement;
  radioPrioridadeMedia: HTMLInputElement;
  radioPrioridadeBaixa: HTMLInputElement;

  tarefaSelecionada: Tarefa;

  tarefas: Tarefa[];

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
    this.atualizarTabela();
  }

  configurarElementos(): void {
    this.tbTarefa = document.getElementById(
      "tabela-tarefas"
    ) as HTMLTableElement;

    this.btnEditarModal = document.getElementById(
      "btnEditar"
    ) as HTMLButtonElement;

    this.txtTituloModalEditar = document.getElementById(
      "txtTituloEdicao"
    ) as HTMLInputElement;

    this.radioPrioridadeAlta = document.getElementById(
      "radioPrioridadeAlta"
    ) as HTMLInputElement;

    this.radioPrioridadeMedia = document.getElementById(
      "radioPrioridadeMedia"
    ) as HTMLInputElement;

    this.radioPrioridadeBaixa = document.getElementById(
      "radioPrioridadeBaixa"
    ) as HTMLInputElement;

    this.btnExcluirModal = document.getElementById(
      "btnExcluir"
    ) as HTMLButtonElement;
  }

  atualizarTabela(): void {
    const tarefas = this.repositorioTarefas.selecionarTodos();

    let corpoTabela = this.tbTarefa.getElementsByTagName("tbody")[0];

    tarefas.forEach((tarefa) => {
      const novaLinha = corpoTabela.insertRow();

      Object.values(tarefa).forEach((valor) => {
        const novaCelula = novaLinha.insertCell();

        novaCelula.innerText = valor;
      });

      var iconEditar = document.createElement("button");
      iconEditar.innerHTML = '<i class="bx bxs-edit-alt"></i>';

      iconEditar.setAttribute("data-bs-toggle", "modal");
      iconEditar.setAttribute("data-bs-target", "#editarTarefaModal");
      iconEditar.onclick = (_evt) => {
        this.carregarTarefa(tarefa);
      };

      this.btnEditarModal.onclick = (_evt) => {
        this.tarefaSelecionada.titulo = this.txtTituloModalEditar.value;

        if (this.radioPrioridadeAlta.checked) {
          this.tarefaSelecionada.prioridade = Prioridade.Alta;
        } else if (this.radioPrioridadeMedia.checked) {
          this.tarefaSelecionada.prioridade = Prioridade.Media;
        } else if (this.radioPrioridadeBaixa.checked) {
          this.tarefaSelecionada.prioridade = Prioridade.Baixa;
        }

        this.repositorioTarefas.editar(this.tarefaSelecionada);

        location.reload();
      };

      novaLinha.appendChild(iconEditar);

      var iconExcluir = document.createElement("button");
      iconExcluir.innerHTML = '<i class="bx bx-trash"></i>';

      iconExcluir.setAttribute("data-bs-toggle", "modal");
      iconExcluir.setAttribute("data-bs-target", "#excluirTarefaModal");
      iconExcluir.onclick = (_evt) => {
        this.carregarTarefa(tarefa);
      };

      this.btnExcluirModal.onclick = (_evt) => {
        this.repositorioTarefas.excluir(this.tarefaSelecionada);

        location.reload();
      };

      novaLinha.appendChild(iconExcluir);
    });
  }

  carregarTarefa(tarefa: Tarefa) {
    this.txtTituloModalEditar.value = tarefa.titulo;

    if (tarefa.prioridade == "Alta") {
      this.radioPrioridadeAlta.setAttribute("checked", "true");
    } else if (tarefa.prioridade == "Média") {
      this.radioPrioridadeMedia.setAttribute("checked", "true");
    } else if (tarefa.prioridade == "Baixa") {
      this.radioPrioridadeBaixa.setAttribute("checked", "true");
    }

    this.tarefaSelecionada = tarefa;
  }
}

new GerenciadorDeTarefa(new TarefaRepositoryLocalStorage());
