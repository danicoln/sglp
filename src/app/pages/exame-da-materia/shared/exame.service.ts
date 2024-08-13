import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { ExameDaMateria } from "./exame.model";
import { BehaviorSubject, Observable, firstValueFrom, from } from "rxjs";
import { ErrorHandlerService } from "../../../core/error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class ExameDaMateriaService {

  chave: string = '';
  private id?: string;
  private laudoId?: string;
  protected http?: HttpClient;
  protected errorHandler?: ErrorHandlerService;
  private mostrarFormSubject = new BehaviorSubject<boolean>(false);
  mostrarForm$ = this.mostrarFormSubject.asObservable();

  constructor(
    // protected apiPath: string, 
    protected injector: Injector
  ) { 
    this.http = this.injector.get(HttpClient);
    this.errorHandler = this.injector.get(ErrorHandlerService);
  }

  alternarForm() {
    this.mostrarFormSubject.next(!this.mostrarFormSubject.value);
  }

  private getUrl(laudoId: string): string {
    return `http://localhost:8080/api/laudos/${laudoId}/exames`;
  }

  async obterExame(laudoId: string): Promise<ExameDaMateria> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = this.getUrl(laudoId);

    try {
      const response = await firstValueFrom(this.http!.get<ExameDaMateria>(url, { headers }));
      return response;
    } catch (erro) {
      if (erro instanceof HttpErrorResponse && erro.status === 404) {
        return new ExameDaMateria();
      } else {
        console.error('Err0 ao obter exame: ', erro);
        throw erro;
      }
    }
  }

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setLaudoId(id: string){
    this.laudoId = id;
    this.getUrl(id);
  }

  salvar(laudoId: string, exame: ExameDaMateria): Promise<ExameDaMateria> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');
    const url = this.getUrl(laudoId);
    return firstValueFrom(this.http!.post<ExameDaMateria>(url, exame, { headers }));
  }

  atualizar(laudoId: string, exame: ExameDaMateria): Observable<ExameDaMateria> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');
    const url = this.getUrl(laudoId);

    return this.http!.put<ExameDaMateria>(`${url}/${exame.id}`, exame, { headers });
  }


  excluir(laudoId: string, exameId: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = this.getUrl(laudoId);
    return firstValueFrom(this.http!.delete<void>(`${url}/${exameId}`, { headers }));
  }

  buscarPorId(laudoId: string, exameId: string): Promise<ExameDaMateria> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave);
    const url = this.getUrl(laudoId);

    return this.http!.get<ExameDaMateria>(`${url}/${exameId}`, { headers })
      .toPromise()
      .then((exame: ExameDaMateria | undefined) => {
        if (!exame) {
          throw new Error('Exame não encontrado');
        }
        return exame;
      })
      .catch((error: any) => {
        console.error('Erro ao buscar exame pelo ID: ', error);
        throw error;
      });
  }


}
