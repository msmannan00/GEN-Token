import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class restService {

  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getTransactions(page: number, perPage: number = 2) {

    const url = `${this.baseUrl}/transaction?page=${page}&per_page=${perPage}`;
    const headers = new HttpHeaders()
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8')
        .set('Accept-Language', 'en-US,en;q=0.5');

    return this.http.get(url, {headers})
  }
}
