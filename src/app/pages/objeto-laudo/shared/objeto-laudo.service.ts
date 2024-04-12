import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, from } from 'rxjs';
import { ObjetoLaudo } from './objeto-laudo.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetoLaudoService {

  chave: string = '';

  url = "http://localhost:8080/api/objetos";

  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<ObjetoLaudo[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
   return from(this.http.get<ObjetoLaudo[]>(this.url, {headers}));

  }

  salvar(objetoLaudo: ObjetoLaudo): Promise<ObjetoLaudo> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<ObjetoLaudo>(this.url, objetoLaudo, { headers }));
  }

  atualizar(objetoLaudo: ObjetoLaudo): Observable<ObjetoLaudo> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return this.http.put<ObjetoLaudo>(`${this.url}/${objetoLaudo.id}`, objetoLaudo, { headers });
  }


  excluir(codigo: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return firstValueFrom(this.http.delete<void>(`${this.url}/${codigo}`, { headers }));
  }

  /*
  listarDocumentos(objId: string): Observable<Documento[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return this.http.get<Documento[]>(`${this.url}/${objId}/documentos`, {headers});
  }
*/
}
