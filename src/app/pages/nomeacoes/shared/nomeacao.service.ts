import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nomeacao } from './nomeacao.model';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NomeacaoService {

  chave: string = '';

  url = "http://localhost:8080/api/nomeacoes";

  constructor(
    private http: HttpClient
  ) { }

  async listar(): Promise<Nomeacao[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);

    try{
      const response = await this.http.get<Nomeacao[]>(this.url, {headers}).toPromise();
      return response || [];
    } catch(error) {
      console.error('Erro ao listar as nomeações: ', error);
      throw error;
    }

  }

  salvar(nomeacao: Nomeacao): Promise<Nomeacao> {
    const headers = new HttpHeaders()
    .append('Authorization', this.chave)
    .append('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.post<Nomeacao>(this.url, nomeacao, { headers })
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      )
    );
  }

  atualizar(nomeacao: Nomeacao): Observable<Nomeacao> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return this.http.put<Nomeacao>(`${this.url}/${nomeacao.id}`, nomeacao, { headers });
  }


  excluir(codigo: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return firstValueFrom(this.http.delete<void>(`${this.url}/${codigo}`, { headers }));
  }


}
