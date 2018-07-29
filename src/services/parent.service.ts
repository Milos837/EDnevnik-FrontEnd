import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { AuthService } from './auth.service';
import { Parent } from '../models/parent';
import { Observable } from '../../node_modules/rxjs';
import { NewUser } from '../models/newuser';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private parentUrl = environment.apiBaseUrl.concat('/parents/');

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllParents(): Observable<Parent[]> {
    return this.http.get<any>(this.parentUrl, {headers: this.authService.getHeaders()});
  }

  deleteParent(id: number): Observable<Parent> {
    return this.http.delete<any>(`${this.parentUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  getParent(id: number): Observable<Parent> {
    return this.http.get<any>(`${this.parentUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  addParent(newParent: NewUser): Observable<NewUser> {
    return this.http.post<any>(this.parentUrl, newParent, {headers: this.authService.getHeaders()});
  }

  updateParent(id: number, parent: NewUser): Observable<Parent> {
    return this.http.put<any>(`${this.parentUrl}${id}`, parent, {headers: this.authService.getHeaders()});
  }

  getChildren(id: number): Observable<Student[]> {
    return this.http.get<any>(`${this.parentUrl}${id}/children/`, {headers: this.authService.getHeaders()});
  }
}
