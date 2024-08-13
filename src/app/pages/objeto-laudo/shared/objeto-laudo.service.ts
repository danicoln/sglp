import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, from } from 'rxjs';
import { ObjetoLaudo } from './objeto-laudo.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetoLaudoService {

  chave: string = '';

  constructor(
    private http: HttpClient
  ) { }

  private getUrl(exameId: string): string {
    return `http://localhost:8080/api/exames/${exameId}/objetos`;
  }


  listar(exameId: string): Observable<ObjetoLaudo[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
   return from(this.http.get<ObjetoLaudo[]>(this.getUrl(exameId), {headers}));
  }

  salvar(exameId: string, objetoLaudo: ObjetoLaudo): Promise<ObjetoLaudo> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<ObjetoLaudo>(this.getUrl(exameId), objetoLaudo, { headers }));
  }

  atualizar(exameId: string, objetoLaudo: ObjetoLaudo): Observable<ObjetoLaudo> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return this.http.put<ObjetoLaudo>(`${this.getUrl(exameId)}/${objetoLaudo.id}`, objetoLaudo, { headers });
  }

  excluir(exameId: string, objetoId: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);

    return firstValueFrom(this.http.delete<void>(`${this.getUrl(exameId)}/${objetoId}`, { headers }));
  }

}
