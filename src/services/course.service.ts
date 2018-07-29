import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { TeacherCourse } from '../models/teachercourse';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = environment.apiBaseUrl.concat('/courses/');

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<any>(this.courseUrl, {headers: this.authService.getHeaders()});
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<any>(`${this.courseUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  addCourse(newCourse: Course): Observable<Course> {
    return this.http.post<any>(this.courseUrl, newCourse, {headers: this.authService.getHeaders()});
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<any>(`${this.courseUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  getTeachersForCourse(id: number): Observable<Teacher[]> {
    return this.http.get<any>(`${this.courseUrl}${id}/teachers/`, {headers: this.authService.getHeaders()});
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<any>(`${this.courseUrl}${id}`, course, {headers: this.authService.getHeaders()});
  }

  getAllTeacherCourse(): Observable<TeacherCourse[]> {
    return this.http.get<any>(this.courseUrl + 'teacher-course/', {headers: this.authService.getHeaders()});
  }
}
