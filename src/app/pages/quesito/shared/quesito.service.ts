import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Quesito } from "./quesito.model";
import { BehaviorSubject, Observable, firstValueFrom, from, map } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class QuesitoService {

  chave: string = '';

  private mostrarFormSubject = new BehaviorSubject<boolean>(false);
  mostrarForm$ = this.mostrarFormSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  private getUrl(laudoId: string): string {
    return `http://localhost:8080/api/laudos/${laudoId}/quesitos`;
  }

  alternarForm() {
    this.mostrarFormSubject.next(!this.mostrarFormSubject.value);
  }

  buscarPorId(laudoId: string, quesitoId: string): Promise<Quesito> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave);
    const url = this.getUrl(laudoId);

    return this.http.get<Quesito>(`${this.getUrl(laudoId)}/${quesitoId}`, { headers })
      .toPromise()
      .then((quesito: Quesito | undefined) => {
        if (!quesito) {
          throw new Error('Quesito não encontrado');
        }
        return quesito;
      })
      .catch((error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: `Ocorreu um erro ao buscar quesito pelo ID: ${quesitoId}. Por favor, tente novamente.`,
          timer: 3000,
          showConfirmButton: false
        });
        throw error;
      });
  }

  listar(laudoId: string): Observable<Quesito[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return from(this.http.get<Quesito[]>(this.getUrl(laudoId), { headers }));

  }

  salvar(laudoId: string, quesito: Quesito): Promise<Quesito> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');
    console.log('URL:', this.getUrl(laudoId));
    console.log('Quesito:', quesito);
    return firstValueFrom(this.http.post<Quesito>(this.getUrl(laudoId), quesito, { headers }));
  }

  atualizar(laudoId: string, quesito: Quesito): Observable<Quesito> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');

    return this.http.put<Quesito>(`${this.getUrl(laudoId)}/${quesito.id}`, quesito, { headers });
  }


  excluir(laudoId: string, codigo: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return firstValueFrom(this.http.delete<void>(`${this.getUrl(laudoId)}/${codigo}`, { headers }));
  }

  getIAResponse(laudoId: string, prompt: string): Observable<string> {
    const request = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ]
    };
    return this.http.post<{ content: string }>(`${this.getUrl(laudoId)}/ia`, request)
      .pipe(map(response => response.content));
  }
}
