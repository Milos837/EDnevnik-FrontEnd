import { Component, OnInit } from '@angular/core';
import { StudentTeacherCourse } from '../../../../models/studentteachercourse';
import { Student } from '../../../../models/student';
import { TeacherCourse } from '../../../../models/teachercourse';
import { Course } from '../../../../models/course';
import { Teacher } from '../../../../models/teacher';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Location } from '../../../../../node_modules/@angular/common';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Grade } from '../../../../models/grade';
import { GradeService } from '../../../../services/grade.service';
import { NewGrade } from '../../../../models/newgrade';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css']
})
export class StudentGradesComponent implements OnInit {
  studentTeacherCourse: StudentTeacherCourse;
  grades: Grade[];
  newgrade: NewGrade;
  addedGrade: boolean;
  finalized: boolean;
  loading: boolean;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal,
    private gradeService: GradeService
  ) { }

  ngOnInit() {
    this.studentTeacherCourse = new StudentTeacherCourse();
    this.studentTeacherCourse.student = new Student();
    this.studentTeacherCourse.teacherCourse = new TeacherCourse();
    this.studentTeacherCourse.teacherCourse.course = new Course();
    this.studentTeacherCourse.teacherCourse.teacher = new Teacher();
    this.finalized = false;
    this.loading = false;
    this.getStudentTeacherCourse();
  }

  open(content) {
    this.addedGrade = false;
    this.newgrade = new Grade();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  getStudentTeacherCourse(): void {
    const studentId = +this.route.snapshot.paramMap.get('studentId');
    const teacherCourseId = +this.route.snapshot.paramMap.get('teacherCourseId');
    this.studentService.getStudentTeacherCourse(studentId, teacherCourseId).subscribe(
      studentTeacherCourse => {
        this.studentTeacherCourse = studentTeacherCourse;
        this.getGradesForSTC();
      });
  }

  goBack(): void {
    this.location.back();
  }

  getGradesForSTC(): void {
    const studentId = +this.route.snapshot.paramMap.get('studentId');
    const teacherCourseId = +this.route.snapshot.paramMap.get('teacherCourseId');
    this.gradeService.getGradesForSTC(studentId, teacherCourseId).subscribe(
      grades => {
        this.grades = grades;
        this.checkForFinal();
      });
  }

  addGrade(): void {
    this.loading = true;
    const stcId = this.studentTeacherCourse.id;
    this.gradeService.addGrade(stcId, this.newgrade).subscribe(
      data => {
        this.getGradesForSTC();
        this.addedGrade = true;
        this.loading = false;
      });
  }

  checkForFinal(): void {
    for (const grade of this.grades) {
      if (grade.type === 'FINAL') {
        this.finalized = true;
      }
    }
  }

}
