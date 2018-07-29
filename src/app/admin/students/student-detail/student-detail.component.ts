import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../../../models/student';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { StudentService } from '../../../../services/student.service';
import { Location } from '../../../../../node_modules/@angular/common';
import { NgbModal, NgbModalRef } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { NewUser } from '../../../../models/newuser';
import { TeacherCourse } from '../../../../models/teachercourse';
import { CourseService } from '../../../../services/course.service';
import { Course } from '../../../../models/course';
import { Teacher } from '../../../../models/teacher';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Student;
  @Input() teacherCourses: TeacherCourse[];
  @Input() allTeacherCourses: TeacherCourse[];
  newteachercourse: TeacherCourse;
  formDisabled: boolean;
  updated: boolean;
  greska: boolean;
  dodat: boolean;
  modalReference: NgbModalRef;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location,
    private modalService: NgbModal,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.student = new Student();
    this.getStudent();
    this.getCoursesForStudent();
    this.getAllTeacherCourses();
    this.formDisabled = true;
    this.updated = false;
    this.newteachercourse = new TeacherCourse();
    this.newteachercourse.course = new Course();
    this.newteachercourse.teacher = new Teacher();
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id).subscribe(student => this.student = student);
  }

  goBack(): void {
    this.location.back();
  }

  open(content) {
    this.dodat = false;
    this.greska = false;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  updateStudent(): void {
    const studentId = +this.route.snapshot.paramMap.get('id');
    const updatedStudent: NewUser = new NewUser();
    updatedStudent.firstName = this.student.firstName;
    updatedStudent.lastName = this.student.lastName;
    updatedStudent.username = 'tempvalue';
    updatedStudent.password = 'tempvalue';
    updatedStudent.confirmedPassword = 'tempvalue';
    this.studentService.updateStudent(studentId, updatedStudent).subscribe(
      data => {
        this.updated = true;
        this.formDisabled = true;
      });
  }

  getCoursesForStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getCoursesForStudent(id).subscribe(teacherCourses => this.teacherCourses = teacherCourses);
  }

  getAllTeacherCourses(): void {
    this.courseService.getAllTeacherCourse().subscribe(allTeacherCourses => this.allTeacherCourses = allTeacherCourses);
  }

  alreadyListens(newteachercourse: TeacherCourse): boolean {
    for (const tc of this.teacherCourses) {
      if (tc.id === newteachercourse.id) {
        return true;
      }
    }
    return false;
  }

  addTeacherCourse(): void {
    if (!this.alreadyListens(this.newteachercourse)) {
      this.greska = false;
      const studentId = +this.route.snapshot.paramMap.get('id');
      const teacherId = this.newteachercourse.teacher.id;
      const courseId = this.newteachercourse.course.id;
      this.studentService.addCourseForStudent(studentId, teacherId, courseId).subscribe(
        data => {
          this.getCoursesForStudent();
          this.dodat = true;
         });
    } else {
      this.greska = true;
    }
    /* this.modalReference.close(); */
  }

  removeTeacherCourse(teacherCourseId: number, courseName: number) {
    if (confirm('Da li ste sigurni da želite da uklonite predmet ' + courseName + ' ?')) {
      const studentId = +this.route.snapshot.paramMap.get('id');
      this.studentService.deleteCourseForStudent(studentId, teacherCourseId).subscribe(data => this.getCoursesForStudent());
    }
  }

}
