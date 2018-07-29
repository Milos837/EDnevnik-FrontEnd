import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from '../../node_modules/rxjs';
import { Grade } from '../models/grade';
import { NewGrade } from '../models/newgrade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private gradeUrl = environment.apiBaseUrl.concat('/grades/');

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGradesForSTC(studentId: number, teacherCourseId: number): Observable<Grade[]> {
    return this.http.get<any>(`${this.gradeUrl}student/${studentId}/teacher-course/${teacherCourseId}`
    , {headers: this.authService.getHeaders()});
  }

  addGrade(stcId: number, newgrade: NewGrade): Observable<any> {
    return this.http.post<any>(`${this.gradeUrl}${stcId}`, newgrade, {headers: this.authService.getHeaders()});
  }
}
