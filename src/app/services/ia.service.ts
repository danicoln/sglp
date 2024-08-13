import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class IaService {
  
    private apiUrl = '/api/ia'; // Endpoint no seu backend
  
    constructor(private http: HttpClient) { }
  
    completarTexto(prompt: string) {
      return this.http.post<string>(`${this.apiUrl}/generate`, { prompt });
    }
  }