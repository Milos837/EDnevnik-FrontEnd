import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Course } from '../../../../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  newCourse: Course;
  addedCourse: boolean;

  constructor(
    private courseService: CourseService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getCourses();
    this.addedCourse = false;
  }

  open(content) {
    this.addedCourse = false;
    this.newCourse = new Course();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => this.courses = courses);
  }

  deleteCourse(id: number, name: string) {
    if (confirm(`Da li ste sigurni da želite da uklonite predmet ${name}?`)) {
      this.courseService.deleteCourse(id).subscribe(data => this.getCourses());
    }
  }

  addCourse(): void {
    this.courseService.addCourse(this.newCourse).subscribe(
      data => {
        this.getCourses();
        this.addedCourse = true;
      }
    );
  }
}
