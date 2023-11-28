// account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'https://localhost:5001/api/';
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'account/login', model);
  }

  logout() {
    // Perform any logout logic, e.g., clearing tokens, session data, etc.
    // Set the loggedIn status to false
    this.loggedIn = false;
  }

  // Assuming you have a method to set the login status
  setLoggedIn(status: boolean): void {
    this.loggedIn = status;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
