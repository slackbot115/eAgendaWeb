import { IPaginaHTML } from "../interfaces/pagina.interface.js";
import { IPaginaListagem } from "../interfaces/pagina.list.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";

class GerenciadorDeContato implements IPaginaHTML, IPaginaListagem {
  tbContato: HTMLTableElement;
  btnEditarModal: HTMLButtonElement;
  btnExcluirModal: HTMLButtonElement;

  txtNomeModalEditar: HTMLInputElement;
  txtEmailModalEditar: HTMLInputElement;
  txtTelefoneModalEditar: HTMLInputElement;
  txtEmpresaModalEditar: HTMLInputElement;
  txtCargoModalEditar: HTMLInputElement;

  contatoSelecionado: Contato;
  contatos: Contato[];

  constructor(private repositorioContatos: IRepositorio<Contato>) {
    this.configurarElementos();
    this.atualizarTabela();
  }

  configurarElementos(): void {
    this.tbContato = document.getElementById(
      "tabela-contatos"
    ) as HTMLTableElement;
    this.btnEditarModal = document.getElementById(
      "btnEditar"
    ) as HTMLButtonElement;
    this.btnExcluirModal = document.getElementById(
      "btnExcluir"
    ) as HTMLButtonElement;

    this.txtNomeModalEditar = document.getElementById(
      "txtNomeEdicao"
    ) as HTMLInputElement;
    this.txtEmailModalEditar = document.getElementById(
      "txtEmailEdicao"
    ) as HTMLInputElement;
    this.txtTelefoneModalEditar = document.getElementById(
      "txtTelefoneEdicao"
    ) as HTMLInputElement;
    this.txtEmpresaModalEditar = document.getElementById(
      "txtEmpresaEdicao"
    ) as HTMLInputElement;
    this.txtCargoModalEditar = document.getElementById(
      "txtCargoEdicao"
    ) as HTMLInputElement;
  }

  atualizarTabela(): void {
    const contatos = this.repositorioContatos.selecionarTodos();

    let corpoTabela = this.tbContato.getElementsByTagName("tbody")[0];

    contatos.forEach((contato) => {
      const novaLinha = corpoTabela.insertRow();

      Object.values(contato).forEach((valor) => {
        const novaCelula = novaLinha.insertCell();

        novaCelula.innerHTML = valor;
      });

      var iconEditar = document.createElement("button");
      iconEditar.innerHTML = '<i class="bx bxs-edit-alt"></i>';

      iconEditar.setAttribute("data-bs-toggle", "modal");
      iconEditar.setAttribute("data-bs-target", "#editarContatoModal");
      iconEditar.onclick = (_evt) => {
        this.carregarContato(contato);
      };

      this.btnEditarModal.onclick = (_evt) => {
        this.contatoSelecionado.nome = this.txtNomeModalEditar.value;
        this.contatoSelecionado.email = this.txtEmailModalEditar.value;
        this.contatoSelecionado.telefone = this.txtTelefoneModalEditar.value;
        this.contatoSelecionado.empresa = this.txtEmpresaModalEditar.value;
        this.contatoSelecionado.cargo = this.txtCargoModalEditar.value;

        this.repositorioContatos.editar(this.contatoSelecionado);

        location.reload();
      };

      novaLinha.appendChild(iconEditar);

      var iconExcluir = document.createElement("button");
      iconExcluir.innerHTML = '<i class="bx bx-trash"></i>';

      iconExcluir.setAttribute("data-bs-toggle", "modal");
      iconExcluir.setAttribute("data-bs-target", "#excluirContatoModal");
      iconExcluir.onclick = (_evt) => {
        this.carregarContato(contato);
      };

      this.btnExcluirModal.onclick = (_evt) => {
        this.repositorioContatos.excluir(this.contatoSelecionado);

        location.reload();
      };

      novaLinha.appendChild(iconExcluir);
    });
  }

  carregarContato(contato: Contato): void {
    this.contatoSelecionado = contato;

    this.txtNomeModalEditar.value = contato.nome;
    this.txtEmailModalEditar.value = contato.email;
    this.txtTelefoneModalEditar.value = contato.telefone;
    this.txtEmpresaModalEditar.value = contato.empresa;
    this.txtCargoModalEditar.value = contato.cargo;
  }
}

new GerenciadorDeContato(new ContatoRepositoryLocalStorage());
