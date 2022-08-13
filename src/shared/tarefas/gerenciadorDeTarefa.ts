import { IPaginaHTML } from "../interfaces/pagina.interface.js";
import { IPaginaListagem } from "../interfaces/pagina.list.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class GerenciadorDeTarefa implements IPaginaHTML, IPaginaListagem {
  tbTarefa: HTMLTableElement;
  btnEditarModal: HTMLButtonElement;

  txtTituloModalEditar: HTMLInputElement;
  radioPrioridadeAlta: HTMLInputElement;
  radioPrioridadeMedia: HTMLInputElement;
  radioPrioridadeBaixa: HTMLInputElement;

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
        this.carregarTarefaEdicao(tarefa);
      };

      this.btnEditarModal.onclick = (_evt) => {
        tarefa.id = tarefa.titulo = this.txtTituloModalEditar.value;

        if (this.radioPrioridadeAlta.checked) {
          tarefa.prioridade = Prioridade.Alta;
        } else if (this.radioPrioridadeMedia.checked) {
          tarefa.prioridade = Prioridade.Media;
        } else if (this.radioPrioridadeBaixa.checked) {
          tarefa.prioridade = Prioridade.Baixa;
        }

        this.repositorioTarefas.editar(tarefa);

        location.reload();
      };

      var iconExcluir = document.createElement("button");
      iconExcluir.innerHTML = '<i class="bx bx-trash"></i>';

      novaLinha.appendChild(iconEditar);
      novaLinha.appendChild(iconExcluir);
    });
  }

  carregarTarefaEdicao(tarefa: Tarefa) {
    this.txtTituloModalEditar.value = tarefa.titulo;
    // this.txtTituloModalEditar.innerText = tarefa.titulo;

    if (tarefa.prioridade == "Alta") {
      this.radioPrioridadeAlta.setAttribute("checked", "true");
    } else if (tarefa.prioridade == "Média") {
      this.radioPrioridadeMedia.setAttribute("checked", "true");
    } else if (tarefa.prioridade == "Baixa") {
      this.radioPrioridadeBaixa.setAttribute("checked", "true");
    }
  }

  removerTarefa(tarefa: Tarefa) {
    let tarefaIndex = this.tarefas.findIndex((t) => t === tarefa);
    if (tarefaIndex > -1) {
      this.tarefas.splice(tarefaIndex, 1);
    }
  }
}

new GerenciadorDeTarefa(new TarefaRepositoryLocalStorage());
