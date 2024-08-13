import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatOpenAiService {

    chave: string = '';

    apiUrl = "http://localhost:8080/api/ia/chat";

    constructor(
        private http: HttpClient
    ) { }

    getChatResponse(prompt: string): Observable<string> {
        const request = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: prompt }
            ]
        };
        return this.http.post<{ content: string }>(this.apiUrl, request)
            .pipe(map(response => response.content));
    }

    generateResponse(prompt: string) {
        return this.http.post<string>(this.apiUrl, { prompt });
    }
}