import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../../models/course';
import { Teacher } from '../../../../models/teacher';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Location } from '../../../../../node_modules/@angular/common';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course: Course;
  @Input() teachers: Teacher[];
  formDisabled: boolean;
  updated: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.course = new Course();
    this.getCourse();
    this.getTeachersForCourse();
    this.formDisabled = true;
    this.updated = false;
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe(course => this.course = course);
  }

  goBack(): void {
    this.location.back();
  }

  getTeachersForCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getTeachersForCourse(id).subscribe(teachers => this.teachers = teachers);
  }

  updateCourse(): void {
    const courseId = +this.route.snapshot.paramMap.get('id');
    const courseName: string = this.course.name;
    this.course.id = null;
    this.course.name = 'tempvalue';
    this.courseService.updateCourse(courseId, this.course).subscribe(
      data => {
        this.updated = true;
        this.formDisabled = true;
        this.course.name = courseName;
      });
  }

}
