import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from '../../../../models/teacher';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../../../services/teacher.service';
import { Location } from '@angular/common';
import { Course } from '../../../../models/course';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../../../services/course.service';
import { NewUser } from '../../../../models/newuser';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {

  @Input() teacher: Teacher;
  @Input() courses: Course[];
  @Input() allCourses: Course[];
  formDisabled: boolean;
  newcourse: Course;
  modalReference: NgbModalRef;
  greska: boolean;
  dodat: boolean;
  updated: boolean;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private location: Location,
    private modalService: NgbModal,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.teacher = new Teacher();
    this.getTeacher();
    this.getCoursesForTeacher();
    this.getAllCourses();
    this.formDisabled = true;
    this.newcourse = new Course();
    this.updated = false;
  }

  getTeacher(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacher(id).subscribe(teacher => this.teacher = teacher);
  }

  getCoursesForTeacher(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.teacherService.getCoursesForTeacher(id).subscribe(courses => this.courses = courses);
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(allCourses => this.allCourses = allCourses);
  }

  goBack(): void {
    this.location.back();
  }

  open(content) {
    this.dodat = false;
    this.greska = false;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  alreadyTeaches(newcourse: Course): boolean {
    for (const course of this.courses) {
      if (course.id === newcourse.id) {
        return true;
      }
    }
    return false;
  }

  addCourse(): void {
    if (!this.alreadyTeaches(this.newcourse)) {
      this.greska = false;
      const teacherId = +this.route.snapshot.paramMap.get('id');
      const courseId = this.newcourse.id;
      this.teacherService.addCourseForTeacher(teacherId, courseId).subscribe(
        data => {
          this.getCoursesForTeacher();
          this.dodat = true;
         });
    } else {
      this.greska = true;
    }
    /* this.modalReference.close(); */
  }

  removeCourse(courseId: number, courseName: string) {
    if (confirm('Da li ste sigurni da želite da uklonite predmet ' + courseName + ' ?')) {
      const teacherId = +this.route.snapshot.paramMap.get('id');
      this.teacherService.removeCourseForTeacher(teacherId, courseId).subscribe(data => this.getCoursesForTeacher());
    }
  }

  updateTeacher(): void {
    const teacherId = +this.route.snapshot.paramMap.get('id');
    const updatedTeacher: NewUser = new NewUser();
    updatedTeacher.firstName = this.teacher.firstName;
    updatedTeacher.lastName = this.teacher.lastName;
    updatedTeacher.username = 'tempvalue';
    updatedTeacher.password = 'tempvalue';
    updatedTeacher.confirmedPassword = 'tempvalue';
    this.teacherService.updateTeacher(teacherId, updatedTeacher).subscribe(
      data => {
        this.updated = true;
        this.formDisabled = true;
      });
  }

}
