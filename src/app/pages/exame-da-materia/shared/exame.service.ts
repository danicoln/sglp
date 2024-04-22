import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ExameDaMateria } from "./exame.model";
import { Observable, firstValueFrom, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExameDaMateriaService {

  chave: string = '';

  url = "http://localhost:8080/api/exames";

  constructor(
    private http: HttpClient
  ) { }

  async listar(): Promise<ExameDaMateria[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);

    try{
      const response = await this.http.get<ExameDaMateria[]>(this.url, {headers})
        .toPromise();
      return response || [];
    } catch(erro) {
      console.error('Erro ao listar os exames: ', erro);
      throw erro;
    }
  }

  salvar(exame: ExameDaMateria): Promise<ExameDaMateria> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<ExameDaMateria>(this.url, exame, { headers }));
  }

  atualizar(exame: ExameDaMateria): Observable<ExameDaMateria> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return this.http.put<ExameDaMateria>(`${this.url}/${exame.id}`, exame, { headers });
  }


  excluir(codigo: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return firstValueFrom(this.http.delete<void>(`${this.url}/${codigo}`, { headers }));
  }

}
