import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { LaudoPericial } from './laudo-pericial';

@Injectable({
  providedIn: 'root'
})
export class LaudoPericialService {

  chave: string = '';
  private mostrarFormSubject = new BehaviorSubject<boolean>(false);
  mostrarForm$ = this.mostrarFormSubject.asObservable();

  url = "http://localhost:8080/api/laudos";


  constructor(
    private http: HttpClient
  ) { }

  alternarForm() {
    this.mostrarFormSubject.next(!this.mostrarFormSubject.value);
  }

  //CONFERIR
  pesquisar(): Promise<LaudoPericial[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    let paramentros = new HttpParams();

    /**
     if (laudo.objetivo) {
       paramentros.set('objetivo', laudo.objetivo);
      }
      */

    return this.http.get<any>(`${this.url}`,
      { headers, params: paramentros })
      .toPromise()
      .then((response: any) => {
        const respostaJson = response;
        return respostaJson.content as LaudoPericial[];

        // const resultado = {
        //   dadosLaudo
        // }
        // return resultado;
      });
  }

  buscarPorId(laudoId: string): Promise<LaudoPericial> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave);

    return this.http.get(`${this.url}/${laudoId}`, { headers })
      .toPromise()
      .then((response: any) => {
        const laudo = response as LaudoPericial;

        return laudo;
      })
      .catch((error: any) => {
        console.error('Erro ao buscar laudo pericial pelo ID: ', error);
        throw error;
      });
  }

  getHistoricoProcesso(input: string): Observable<string> {
    const headers = new HttpHeaders()
      .append('Authorization', this.chave)
      .append('Content-Type', 'application/json');

    const body = { message: input };

    return this.http.post<string>(`${this.url}/historico`, body, { headers });
  }


  salvar(laudo: LaudoPericial): Promise<LaudoPericial> {
    const headers = new HttpHeaders()
      .append('Authorization', this.chave)
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<LaudoPericial>(this.url, laudo, { headers }));
  }

  atualizar(laudo: LaudoPericial): Observable<LaudoPericial> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');

    return this.http.put<LaudoPericial>(`${this.url}/${laudo.id}`, laudo, { headers });
  }

  async listar(): Promise<LaudoPericial[]> {
    const headers = new HttpHeaders().set('Authorization', this.chave);

    try {
      const response = await this.http.get<LaudoPericial[]>(this.url, { headers }).toPromise();
      return (response || []).filter(laudo => laudo.ativo);
    } catch (error) {
      console.error('Erro ao listar laudos:', error);
      throw error;
    }
  }

  ativar(laudoId: string): Promise<LaudoPericial> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');

    return firstValueFrom(this.http.put<LaudoPericial>(`${this.url}/${laudoId}/ativar`, { headers }));
  }

  desativar(laudoId: string): Promise<LaudoPericial> {
    const headers = new HttpHeaders()
      .set('Authorization', this.chave)
      .set('Content-Type', 'application/json');

    return firstValueFrom(this.http.put<LaudoPericial>(`${this.url}/${laudoId}/desativar`, { headers }));
  }

  getIAResponse(prompt: string): Observable<string> {
    const request = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ]
    };
    return this.http.post<{ content: string }>(`${this.url}/ia`, request)
      .pipe(map(response => response.content));
  }
}


