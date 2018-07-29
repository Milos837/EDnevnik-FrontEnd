import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Course } from '../models/course';
import { NewUser } from '../models/newuser';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teacherUrl = environment.apiBaseUrl.concat('/teachers/');

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<any>(this.teacherUrl, {headers: this.authService.getHeaders()});
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<any>(`${this.teacherUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  getCoursesForTeacher(id: number): Observable<Course[]> {
    return this.http.get<any>(`${this.teacherUrl}${id}/courses/`, {headers: this.authService.getHeaders()});
  }

  addCourseForTeacher(teacherId: number, courseId: number): Observable<Teacher[]> {
    return this.http.post<any>(`${this.teacherUrl}${teacherId}/courses/${courseId}`, courseId, {headers: this.authService.getHeaders()});
  }

  removeCourseForTeacher(teacherId: number, courseId: number): Observable<Teacher[]> {
    return this.http.delete<any>(`${this.teacherUrl}${teacherId}/courses/${courseId}`, {headers: this.authService.getHeaders()});
  }

  addTeacher(newTeacher: NewUser): Observable<NewUser> {
    return this.http.post<any>(this.teacherUrl, newTeacher, {headers: this.authService.getHeaders()});
  }

  deleteTeacher(id: number): Observable<Teacher> {
    return this.http.delete<any>(`${this.teacherUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  updateTeacher(id: number, teacher: NewUser): Observable<Teacher> {
    return this.http.put<any>(`${this.teacherUrl}${id}`, teacher, {headers: this.authService.getHeaders()});
  }

}
