import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ObjetoLaudo } from '../shared/objeto-laudo.model';
import { Documento } from '../../documentos/shared/documento.model';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ObjetoLaudoService } from '../shared/objeto-laudo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-objeto-laudo-form',
  templateUrl: './objeto-laudo-form.component.html',
  styleUrl: './objeto-laudo-form.component.css'
})
export class ObjetoLaudoFormComponent implements OnInit {

  resourceForm!: FormGroup;

  exibirFormularioNovoDocumento: boolean = false;

  listaDeDocumentos: Documento[] = []; // talvez n precise
  novoDocumento: Documento = new Documento(); // talvez n precise

  objeto: ObjetoLaudo = new ObjetoLaudo();
  objetos: ObjetoLaudo[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private objetoService: ObjetoLaudoService,
    private erro: ErrorHandlerService,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.listarObjetos();
    this.baseResourceForm();
  }

  private baseResourceForm() {
    this.resourceForm = this.formBuilder.group({
      documento: this.formBuilder.group({
        id: [''],
        nomeTitulo: ['', Validators.required],
        descricao: [''],
        data: [undefined]
      })
    });
  }

  submitForm() {
    if (this.resourceForm && this.resourceForm.valid) {

      const dadosFormulario = this.resourceForm.value;

      const documento = dadosFormulario.documento;
      if (documento) {

        this.objeto = {
          documento: documento
        };

        this.salvarDados(this.objeto);

      } else {
        console.error('O ID do documento não está definido');

      }
    } else {
      this.resourceForm?.markAllAsTouched();
    }
  }

  salvarDados(objeto: ObjetoLaudo) {
    this.objetoService.salvar(objeto)
      .then(() => {
        console.log('TOAST: Objeto salvo! ', objeto);
        this.msgService.add(
          { severity: 'success', summary: 'Sucesso', detail: 'Objeto Salvo', life: 3000 });
        this.objeto = new ObjetoLaudo();
        this.resourceForm?.reset();
      })
      .catch(erro => {
        this.erro.handle(erro);
        this.msgService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao Salvar', life: 3000 }
        )
      });

  }

  adicionarDocumento() {
    this.novoDocumento = this.resourceForm.get('documento')?.value;
    this.listaDeDocumentos.push(this.novoDocumento);
    this.exibirFormularioNovoDocumento = false;

    this.resourceForm.reset();

  }

  inserirDocumento() {
    this.exibirFormularioNovoDocumento = !this.exibirFormularioNovoDocumento;
  }

  listarObjetos() {
    return this.objetoService.listar().subscribe(
      (objetos: ObjetoLaudo[]) => {
        this.objetos = objetos;
      },
      (error) => {
        console.error('Erro ao listar objetos: ', error);
      }
    );
  }

  removerDocumento(index: number) {
    this.listaDeDocumentos.at(index)
  }

}
