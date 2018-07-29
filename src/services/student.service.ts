import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { AuthService } from './auth.service';
import { Student } from '../models/student';
import { Observable } from '../../node_modules/rxjs';
import { NewUser } from '../models/newuser';
import { TeacherCourse } from '../models/teachercourse';
import { StudentTeacherCourse } from '../models/studentteachercourse';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUrl = environment.apiBaseUrl.concat('/students/');

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<any>(this.studentUrl, {headers: this.authService.getHeaders()});
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<any>(`${this.studentUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<any>(`${this.studentUrl}${id}`, {headers: this.authService.getHeaders()});
  }

  addStudent(newStudent: NewUser): Observable<NewUser> {
    return this.http.post<any>(this.studentUrl, newStudent, {headers: this.authService.getHeaders()});
  }

  updateStudent(id: number, student: NewUser): Observable<Student> {
    return this.http.put<any>(`${this.studentUrl}${id}`, student, {headers: this.authService.getHeaders()});
  }

  addClassForStudent(studentId: number, classId: number): Observable<Student> {
    return this.http.post<any>(`${this.studentUrl}${studentId}/class/${classId}`, classId, {headers: this.authService.getHeaders()});
  }

  getCoursesForStudent(id: number): Observable<TeacherCourse[]> {
    return this.http.get<any>(`${this.studentUrl}${id}/courses/`, {headers: this.authService.getHeaders()});
  }

  addCourseForStudent(studentId: number, teacherId: number, courseId: number): Observable<Student> {
    return this.http.post<any>(`${this.studentUrl}${studentId}/courses/${courseId}/teachers/${teacherId}`
      , studentId, {headers: this.authService.getHeaders()});
  }

  deleteCourseForStudent(studentId: number, teacherCourseId: number): Observable<any> {
    return this.http.delete<any>(`${this.studentUrl}${studentId}/courses/${teacherCourseId}`, {headers: this.authService.getHeaders()});
  }

  getStudentTeacherCourse(studentId: number, teacherCourseId: number): Observable<StudentTeacherCourse> {
    return this.http.get<any>(`${this.studentUrl}${studentId}/teacher-course/${teacherCourseId}`, {headers: this.authService.getHeaders()});
  }

  addParent(studentId: number, parentId: number): Observable<Student> {
    return this.http.post<any>(`${this.studentUrl}${studentId}/parent/${parentId}`, parentId, {headers: this.authService.getHeaders()});
  }

}
