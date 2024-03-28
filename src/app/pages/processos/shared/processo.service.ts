import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, firstValueFrom } from "rxjs";
import { Processo } from "./processo.model";

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  chave: string = '';

  url = "http://localhost:8080/api/processos";


  constructor(
    private http: HttpClient
  ) { }


  salvar(dadosProcesso: Processo): Promise<Processo> {
    const headers = new HttpHeaders()
    .append('Authorization', this.chave)
    .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Processo>(this.url, dadosProcesso, {headers}));

  }

  atualizar(processo: Processo): Observable<Processo> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave)
    .set('Content-Type', 'application/json');

    return this.http.put<Processo>(`${this.url}/${processo.id}`, processo, { headers });
  }

  async listar(): Promise<Processo[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);

    try{
      const response = await this.http.get<Processo[]>(this.url, { headers }).toPromise();
      return response || [];

    } catch (error) {

      console.error('Erro ao listar processos:', error);
      throw error;
    }

  }

  excluir(codigo: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return firstValueFrom(this.http.delete<void>(`${this.url}/${codigo}`, { headers }));
  }


  buscarPorId(id: string): Promise<Processo> {
    const headers = new HttpHeaders()
    .set('Authorization', this.chave);

  return this.http.get(`${this.url}/${id}`, { headers })
    .toPromise()
    .then((response: any) => {
      const processo = response as Processo;

      return processo;
    })
    .catch((error: any) => {
      console.error('Erro ao buscar processo pelo id: ', error);
      throw error;
    });
  }

}
