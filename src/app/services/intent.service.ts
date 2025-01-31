import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntentService {
  private apiUrl = 'http://localhost:3000/api/intents'; // Backend URL

  constructor(private http: HttpClient) {}

  // Method to post intent data
  createIntent(intentData: any): Observable<any> {
    return this.http.post(this.apiUrl, intentData);
  }
}
