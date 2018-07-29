import { Component, OnInit } from '@angular/core';
import { StudentTeacherCourse } from '../../../models/studentteachercourse';
import { Grade } from '../../../models/grade';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { GradeService } from '../../../services/grade.service';
import { Student } from '../../../models/student';
import { TeacherCourse } from '../../../models/teachercourse';
import { Teacher } from '../../../models/teacher';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-student-grades-list',
  templateUrl: './student-grades-list.component.html',
  styleUrls: ['./student-grades-list.component.css']
})
export class StudentGradesListComponent implements OnInit {
  studentTeacherCourse: StudentTeacherCourse;
  grades: Grade[];
  studentId: number;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private gradeService: GradeService
  ) { }

  ngOnInit() {
    this.studentId = +this.route.parent.snapshot.paramMap.get('id');
    this.studentTeacherCourse = new StudentTeacherCourse();
    this.studentTeacherCourse.student = new Student();
    this.studentTeacherCourse.teacherCourse = new TeacherCourse();
    this.studentTeacherCourse.teacherCourse.course = new Course();
    this.studentTeacherCourse.teacherCourse.teacher = new Teacher();
    this.getStudentTeacherCourse();
  }

  getStudentTeacherCourse(): void {
    const teacherCourseId = +this.route.snapshot.paramMap.get('tcId');
    this.studentService.getStudentTeacherCourse(this.studentId, teacherCourseId).subscribe(
      studentTeacherCourse => {
        this.studentTeacherCourse = studentTeacherCourse;
        this.getGradesForSTC();
      });
  }

  getGradesForSTC(): void {
    const teacherCourseId = +this.route.snapshot.paramMap.get('tcId');
    this.gradeService.getGradesForSTC(this.studentId, teacherCourseId).subscribe(
      grades => {
        this.grades = grades;
      });
  }

}
