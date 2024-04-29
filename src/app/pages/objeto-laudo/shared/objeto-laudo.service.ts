import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, from } from 'rxjs';
import { ObjetoLaudo } from './objeto-laudo.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetoLaudoService {

  chave: string = '';

  apiUrl = "http://localhost:8080/api/exames";

  constructor(
    private http: HttpClient
  ) { }

  listar(exameId: string): Observable<ObjetoLaudo[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = `${this.apiUrl}/${exameId}/objetos`;

   return from(this.http.get<ObjetoLaudo[]>(url, {headers}));
  }

  salvar(exameId: String, objetoLaudo: ObjetoLaudo): Promise<ObjetoLaudo> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');
    const url = `${this.apiUrl}/${exameId}/objetos`;

    return firstValueFrom(this.http.post<ObjetoLaudo>(url, objetoLaudo, { headers }));
  }

  atualizar(exameId: String, objetoLaudo: ObjetoLaudo): Observable<ObjetoLaudo> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');
    const url = `${this.apiUrl}/${exameId}/objetos`;

    return this.http.put<ObjetoLaudo>(`${url}/${objetoLaudo.id}`, objetoLaudo, { headers });
  }


  excluir(exameId: String, objetoId: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = `${this.apiUrl}/${exameId}/objetos`;

    return firstValueFrom(this.http.delete<void>(`${url}/${objetoId}`, { headers }));
  }

}
