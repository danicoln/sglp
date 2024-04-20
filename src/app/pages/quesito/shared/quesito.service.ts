import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Quesito } from "./quesito.model";
import { Observable, firstValueFrom, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuesitoService {

  chave: string = '';

  url = "http://localhost:8080/api/quesitos";

  constructor(
    private http: HttpClient
  ) { }


  listar(): Observable<Quesito[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
   return from(this.http.get<Quesito[]>(this.url, {headers}));

  }

  salvar(exame: Quesito): Promise<Quesito> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Quesito>(this.url, exame, { headers }));
  }

  atualizar(exame: Quesito): Observable<Quesito> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return this.http.put<Quesito>(`${this.url}/${exame.id}`, exame, { headers });
  }


  excluir(codigo: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return firstValueFrom(this.http.delete<void>(`${this.url}/${codigo}`, { headers }));
  }
}
