import { Component, OnInit } from '@angular/core';
import { StudentTeacherCourse } from '../../../../models/studentteachercourse';
import { Grade } from '../../../../models/grade';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { GradeService } from '../../../../services/grade.service';
import { Student } from '../../../../models/student';
import { TeacherCourse } from '../../../../models/teachercourse';
import { Course } from '../../../../models/course';
import { Teacher } from '../../../../models/teacher';

@Component({
  selector: 'app-children-grades',
  templateUrl: './children-grades.component.html',
  styleUrls: ['./children-grades.component.css']
})
export class ChildrenGradesComponent implements OnInit {
  studentTeacherCourse: StudentTeacherCourse;
  grades: Grade[];
  parentId: number;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private gradeService: GradeService
  ) { }

  ngOnInit() {
    this.parentId = +this.route.parent.snapshot.paramMap.get('id');
    this.studentTeacherCourse = new StudentTeacherCourse();
    this.studentTeacherCourse.student = new Student();
    this.studentTeacherCourse.teacherCourse = new TeacherCourse();
    this.studentTeacherCourse.teacherCourse.course = new Course();
    this.studentTeacherCourse.teacherCourse.teacher = new Teacher();
    this.getStudentTeacherCourse();
  }

  getStudentTeacherCourse(): void {
    const studentId = +this.route.snapshot.paramMap.get('studentId');
    const teacherCourseId = +this.route.snapshot.paramMap.get('tcId');
    this.studentService.getStudentTeacherCourse(studentId, teacherCourseId).subscribe(
      studentTeacherCourse => {
        this.studentTeacherCourse = studentTeacherCourse;
        this.getGradesForSTC();
      });
  }

  getGradesForSTC(): void {
    const studentId = +this.route.snapshot.paramMap.get('studentId');
    const teacherCourseId = +this.route.snapshot.paramMap.get('tcId');
    this.gradeService.getGradesForSTC(studentId, teacherCourseId).subscribe(
      grades => {
        this.grades = grades;
      });
  }

}
