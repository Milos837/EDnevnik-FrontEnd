import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { AuthService } from './auth.service';
import { Class } from '../models/class';
import { Observable } from '../../node_modules/rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classUrl = environment.apiBaseUrl.concat('/classes/');

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllClasses(): Observable<Class[]> {
    return this.http.get<any>(this.classUrl, {headers: this.authService.getHeaders()});
  }

  deleteClass(id: number): Observable<Class> {
    return this.http.delete<any>(`${this.classUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  addClass(newClass: Class): Observable<Class> {
    return this.http.post<any>(this.classUrl, newClass, {headers: this.authService.getHeaders()});
  }

  getClass(id: number): Observable<Class> {
    return this.http.get<any>(`${this.classUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  updateClass(id: number, uclass: Class): Observable<Class> {
    return this.http.put<any>(`${this.classUrl}${id}`, uclass, {headers: this.authService.getHeaders()});
  }

  getStudentsForClass(id: number): Observable<Student[]> {
    return this.http.get<any>(`${this.classUrl}${id}/students/`, {headers: this.authService.getHeaders()});
  }
}
