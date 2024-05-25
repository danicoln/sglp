import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ObjetoLaudo } from '../shared/objeto-laudo.model';
import { Documento } from '../../documentos/shared/documento.model';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ObjetoLaudoService } from '../shared/objeto-laudo.service';
import { FormArray, FormBuilder, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-objeto-laudo-form',
  templateUrl: './objeto-laudo-form.component.html',
  styleUrl: './objeto-laudo-form.component.css'
})
export class ObjetoLaudoFormComponent implements OnInit {

  @Output() objetoAdicionado: EventEmitter<ObjetoLaudo> = new EventEmitter<ObjetoLaudo>();
  @Output() objetoSalvo: EventEmitter<ObjetoLaudo> = new EventEmitter<ObjetoLaudo>();

  resourceForm!: FormGroup;

  @Input() objetos!: FormArray;
  @Input() obj!: FormGroup;
  @Input() novaSecao!: FormGroup;
  @Input() index!: number;
  @Input() exameId!: string;
  @Input() objetoId!: string;
  @Input() listaObjetos!: ObjetoLaudo[];

  exibirFormularioNovoDocumento: boolean = false;
  documentoHabilitado: boolean = true;

  listaDeDocumentos: Documento[] = []; // talvez n precise
  novoDocumento: Documento = new Documento(); // talvez n precise

  objeto: ObjetoLaudo = new ObjetoLaudo();

  constructor(
    private formBuilder: FormBuilder,
    private objetoService: ObjetoLaudoService,
    private erro: ErrorHandlerService,
    private route: ActivatedRoute,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.exameId = params['exameId'];
      this.objetoId = params['objetoId'];
      this.buildResourceForm();
    });
  }

  private buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [''],
      exameDaMateriaId: [''],
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

      let novoDocumento = dadosFormulario.documento;

      novoDocumento = {
        id: novoDocumento.id,
        nomeTitulo: novoDocumento.nomeTitulo,
        descricao: novoDocumento.descricao,
        data: novoDocumento.data
      }

      if (novoDocumento) {

        this.objeto = {
          id: this.objetoId,
          exameDaMateriaId: this.exameId,
          documento: novoDocumento
        };

        if(this.objetoId) {
          this.objeto.id = this.objetoId;
          this.atualizarObjeto(this.objeto);
        }
        this.salvarDados(this.objeto);
        this.objetoAdicionado.emit(this.objeto);


      } else {
        console.error('O ID do documento não está definido');

      }
    } else {
      this.resourceForm?.markAllAsTouched();
    }
  }

  salvarDados(objeto: ObjetoLaudo) {
    this.objetoService.salvar(this.exameId, objeto)
      .then(() => {
        console.log('TOAST: Objeto salvo! ', objeto);
        this.msgService.add(
          { severity: 'success', summary: 'Sucesso', detail: 'Objeto Salvo', life: 3000 });

          this.resourceForm?.reset();
      })
      .catch(erro => {
        this.erro.handle(erro);
        this.msgService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao Salvar', life: 3000 }
        )
      });

  }

  atualizarObjeto(objeto: ObjetoLaudo) {

  }

  cancelar() {
    this.resourceForm?.reset();
  }

  inserirDocumento() {
    this.exibirFormularioNovoDocumento = !this.exibirFormularioNovoDocumento;
  }

  removerDocumento(documento: Documento) {
    const index = this.listaDeDocumentos.indexOf(documento);
    if (index !== -1) {
      this.listaDeDocumentos.splice(index, 1);
    }
  }

  get documento(): FormGroup {
    return this.resourceForm?.get('documento') as FormGroup;
  }

  // ===========================================================================
  // implementação para acesso de outros componentes

  removerObjeto() {
    this.objetos.removeAt(this.index);
  }

  sections(): FormArray {
    return this.objetos
      .at(this.index) as FormArray;
  }

  addSecao() {
    this.sections().push(this.novaSecao);
  }

  adicionarObjeto() {

    if (this.resourceForm && this.resourceForm.valid) {
      const dadosFormulario = this.resourceForm.value;

      const documento = dadosFormulario.documento;

      if (documento) {
        const objeto: ObjetoLaudo = {
          exameDaMateriaId: this.exameId,
          documento: documento
        };

        this.objetoAdicionado.emit(objeto);

        this.objeto = new ObjetoLaudo();
        this.resourceForm?.reset();
      } else {
        console.error('O ID do documento não está definido');

      }
    } else {
      this.resourceForm?.markAllAsTouched();
    }
  }


}
