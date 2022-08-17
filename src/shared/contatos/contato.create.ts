import { IPaginaFormulario } from "../interfaces/pagina.create.interface.js";
import { IPaginaHTML } from "../interfaces/pagina.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";

class ContatoCreate implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtEmpresa: HTMLInputElement;
  private txtCargo: HTMLInputElement;

  private btnGravar: HTMLButtonElement;

  constructor(private repositorioContatos: IRepositorio<Contato>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
    this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
    this.txtTelefone = document.getElementById(
      "txtTelefone"
    ) as HTMLInputElement;
    this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
    this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;

    this.btnGravar = document.getElementById("btnGravar") as HTMLButtonElement;
    this.btnGravar.addEventListener("click", (_evt) => this.gravarRegistros());
  }

  gravarRegistros(): void {
    if (this.txtNome.value === "") {
      alert("Preencha o campo nome");
      return;
    } else if (this.txtEmail.value === "") {
      alert("Preencha o campo email");
      return;
    } else if (this.txtTelefone.value === "") {
      alert("Preencha o campo telefone");
      return;
    } else if (this.txtEmpresa.value === "") {
      alert("Preencha o campo empresa");
      return;
    } else if (this.txtCargo.value === "") {
      alert("Preencha o campo cargo");
      return;
    }

    const contato = new Contato(
      this.txtNome.value,
      this.txtEmail.value,
      this.txtTelefone.value,
      this.txtEmpresa.value,
      this.txtCargo.value
    );

    this.repositorioContatos.inserir(contato);

    location.reload();
  }
}

new ContatoCreate(new ContatoRepositoryLocalStorage());
