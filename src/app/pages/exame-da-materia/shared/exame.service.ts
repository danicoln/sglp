import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ExameDaMateria } from "./exame.model";
import { Observable, firstValueFrom, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExameDaMateriaService {

  chave: string = '';

  constructor(
    private http: HttpClient
  ) { }

  private getUrl(laudoId: string): string {
    return `http://localhost:8080/api/laudos/${laudoId}/exames`;
  }

  async listar(laudoId: string): Promise<ExameDaMateria> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = this.getUrl(laudoId);

    try {
      const response = await this.http.get<ExameDaMateria>(url, { headers })
        .toPromise();
      if (!response) {
        throw new Error('Nenhum exame encontrado');
      }
      return response;
    } catch (erro) {
      console.error('Erro ao listar os exames: ', erro);
      throw erro;
    }
  }

  salvar(laudoId: string, exame: ExameDaMateria): Promise<ExameDaMateria> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');
    const url = this.getUrl(laudoId);

    return firstValueFrom(this.http.post<ExameDaMateria>(url, exame, { headers }));
  }

  atualizar(laudoId: string, exame: ExameDaMateria): Observable<ExameDaMateria> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');
    const url = this.getUrl(laudoId);

    return this.http.put<ExameDaMateria>(`${url}/${exame.id}`, exame, { headers });
  }


  excluir(laudoId: string, exameId: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = this.getUrl(laudoId);
    return firstValueFrom(this.http.delete<void>(`${url}/${exameId}`, { headers }));
  }

  buscarPorId(laudoId: string, exameId: string): Promise<ExameDaMateria> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave);
    const url = this.getUrl(laudoId);

    return this.http.get<ExameDaMateria>(`${url}/${exameId}`, { headers })
      .toPromise()
      .then((exame: any) => {
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
