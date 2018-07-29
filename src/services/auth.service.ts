import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.apiBaseUrl + '/util/';
  public role: string;
  public username: string;

  constructor(private httpClient: HttpClient) {
    this.role = localStorage.getItem('role');
  }

  login(username: string, password: string): Observable<string> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));

    return this.httpClient.post<any>(this.authUrl + 'login', {}, { headers: httpHeaders });
  }

  logout() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('role');
    this.role = null;

  }

  isLoggedIn() {
    if (localStorage.getItem('role') == null) {
      return false;
    }
    return true;
  }

  saveCredentials(username: string, password: string, role: string) {
    localStorage.setItem('credentials', btoa(`${username}:${password}`));
    localStorage.setItem('role', role);
    this.role = role;
    this.username = username;
  }

  getHeaders(): HttpHeaders {
    let httpHeaders = new HttpHeaders();

    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      httpHeaders = httpHeaders.append('Content-Type', 'application/json');
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + credentials);
    }

    return httpHeaders;
  }

  getAllUsernames(): Observable<string[]> {
    return this.httpClient.get<any>(this.authUrl + 'usernames', { headers: this.getHeaders() });
  }

}
