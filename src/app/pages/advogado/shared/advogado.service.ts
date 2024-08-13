import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom, from } from "rxjs";
import { Advogado } from "./advogado.model";

@Injectable({
    providedIn: 'root'
  })
  export class AdvogadoService {

    chave: string = '';

    constructor(
        private http: HttpClient
    ) {}

    private getUrl(): string {
        return `http://localhost:8080/api/advogados`;
      }

      async listar(): Promise<Advogado[]> {
        const headers = new HttpHeaders().set('Authorization', this.chave);
    
        try {
          const response = await this.http.get<Advogado[]>(this.getUrl(), { headers }).toPromise();
          return response || [];
        } catch (error) {
    
          console.error('Erro ao listar advogados:', error);
          throw error;
        }
      }

      salvar(advogado: Advogado): Promise<Advogado> {
        const headers = new HttpHeaders()
        .set('Authorization', this.chave)
        .set('Content-Type', 'application/json');

        return firstValueFrom(this.http.post<Advogado>(this.getUrl(), advogado, {headers}));
      }

      atualizar(advogado: Advogado): Observable<Advogado> {
        const headers = new HttpHeaders()
        .set('Authorization', this.chave)
        .set('Content-Type', 'application/json');
    
        return this.http.put<Advogado>(`${this.getUrl()}/${advogado.id}`, advogado, { headers });
      }
    
      excluir(advogadoId: string): Promise<void> {
        const headers = new HttpHeaders().set('Authorization', this.chave);
    
        return firstValueFrom(this.http.delete<void>(`${this.getUrl()}/${advogadoId}`, { headers }));
      }
  }