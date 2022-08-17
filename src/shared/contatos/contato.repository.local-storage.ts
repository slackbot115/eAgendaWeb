import { IRepositorioSerializavel } from "../interfaces/repositorio-serializavel.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { Contato } from "./contato.model.js";

export class ContatoRepositoryLocalStorage
  implements IRepositorio<Contato>, IRepositorioSerializavel
{
  private readonly localStorage: Storage;

  private readonly contatos: Contato[];

  constructor() {
    this.localStorage = window.localStorage;

    this.contatos = this.selecionarTodos();
  }

  public gravar(): void {
    const contatosJsonString = JSON.stringify(this.contatos);

    this.localStorage.setItem("contatos", contatosJsonString);
  }

  public inserir(registro: Contato): void {
    this.contatos.push(registro);

    this.gravar();
  }

  editar(registro: Contato): void {
    let contatoIndex = this.contatos.findIndex(function (contato) {
      return contato.id == registro.id;
    });

    if (contatoIndex > -1) {
      this.contatos[contatoIndex] = registro;
    }

    this.gravar();
  }

  excluir(registro: Contato): void {
    let contatoIndex = this.contatos.findIndex(function (contato) {
      return contato.id == registro.id;
    });

    if (contatoIndex > -1) {
      this.contatos.splice(contatoIndex, 1);
    }

    this.gravar();
  }

  public selecionarTodos(): Contato[] {
    const dados = this.localStorage.getItem("contatos");

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  }
}
