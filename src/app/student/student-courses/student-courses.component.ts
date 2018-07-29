import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { TeacherCourse } from '../../../models/teachercourse';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  teacherCourses: TeacherCourse[];
  studentId: number;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.studentId = +this.route.parent.snapshot.paramMap.get('id');
    this.getCoursesForStudent();
  }

  getCoursesForStudent(): void {
    this.studentService.getCoursesForStudent(this.studentId).subscribe(teacherCourses => this.teacherCourses = teacherCourses);
  }

}
