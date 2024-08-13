import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import Swal from 'sweetalert2';
import { ExameDaMateria } from '../../exame-da-materia/shared/exame.model';
import { ObjetoLaudo } from '../../objeto-laudo/shared/objeto-laudo.model';
import { ChatOpenAiService } from '../shared/chat-openai.service';

@Component({
  selector: 'app-gpt-assistente',
  templateUrl: './gpt-assistente.component.html',
  styleUrl: './gpt-assistente.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GptAssistenteComponent),
      multi: true
    }
  ]
})
export class GptAssistenteComponent implements ControlValueAccessor, OnChanges {

  @Input() contexto!: string;
  @Input() objetos: ObjetoLaudo[] = [];
  @Input() exame!: ExameDaMateria;
  @Input() prompt: string = '';
  @Input() chat: boolean = false;
  @Input() form!: FormGroup;
  @Input() response!: string;
  @Input() isDisabled: boolean = false;
  @Output() generate = new EventEmitter<string>();


  onChange: any = () => { };
  onTouched: any = () => { };

  sidebarVisible: boolean = false;

  @Input() fields: { label: string, prompt: string, fieldName: string }[] = [];

  constructor(private fb: FormBuilder, private gptService: ChatOpenAiService) {
    this.form = this.fb.group({
      prompt: ['']
    });
  }

  writeValue(obj: any): void {
    this.prompt = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onPromptChange(event: any): void {
    this.prompt = event;
    if (this.onChange) {
      this.onChange(this.prompt);
    }
  }

  onGenerate(event: any): void {
    const prompt = this.contexto + ' ' + this.form.value.prompt;
    // this.gptService.getChatResponse(prompt).subscribe(response => {
    //   this.response = response;
    // });
    this.generate.emit(prompt);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.form.patchValue({
        prompt: this.buildPromptFromContexto()
      });
    }
  }

  buildPromptFromContexto(): string {
    let prompt = '';
    this.objetos.forEach(objeto => {
      prompt += `- ${objeto.nomeTitulo}: ${objeto.descricao}\n`;
    });
    return prompt;
  }

  setPromptAndFetchResponse(field: { label: string, prompt: string, fieldName: string }): void {
    if (this.form == null || undefined) {
      return;
    }
    const fieldValue = this.form.get(field.fieldName)?.value || '';
    if (!fieldValue) {
      this.toggleSidebar();
      Swal.fire({
        icon: 'error',
        title: 'Campo Vazio',
        text: `O campo ${field.label} está vazio. Por favor, preencha o campo e tente novamente.`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
          popup: 'custom-sweetalert'
        }
      });
      return;
    }
    const prompt = field.prompt.replace(`{${field.fieldName}}`, fieldValue);
    this.fetchResponse(prompt);
  }

  fetchResponse(prompt: string): void {
    if (!prompt) {
      console.error("Prompt está vazio. Não pôde buscar a resposta.");
      return;
    }
    this.gptService.getChatResponse(prompt).subscribe(response => {
      this.response = response;
      if (this.onChange) {
        this.onChange(this.response);
      }
    }, error => {
      console.error('Error:', error);
    });
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }


  cancelar() {
    this.response = '';
  }

  copyResponse(): void {
    if (!this.response) {
      return;
    }

    // Cria um elemento de textarea fora da tela para copiar o texto
    const textarea = document.createElement('textarea');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.value = this.response;
    document.body.appendChild(textarea);

    // Seleciona o texto dentro do textarea
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    // Tenta copiar o texto para a área de transferência
    try {
      const success = document.execCommand('copy');
      if (success) {
        this.toggleSidebar();
        Swal.fire({
          icon: 'success',
          title: 'Texto Copiado',
          text: 'O texto de resposta foi copiado para a área de transferência.',
          timer: 3000,
          showConfirmButton: false
        });
      } else {
        this.toggleSidebar();
        Swal.fire({
          icon: 'error',
          title: 'Erro ao Copiar',
          text: 'Não foi possível copiar o texto de resposta. Por favor, tente novamente.',
          timer: 3000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
      this.toggleSidebar();
      Swal.fire({
        icon: 'error',
        title: 'Erro ao Copiar',
        text: 'Ocorreu um erro ao copiar o texto de resposta. Por favor, tente novamente.',
        timer: 3000,
        showConfirmButton: false
      });
    }

  }

}
