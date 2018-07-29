import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../models/student';
import { TeacherCourse } from '../../../../models/teachercourse';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-children-courses',
  templateUrl: './children-courses.component.html',
  styleUrls: ['./children-courses.component.css']
})
export class ChildrenCoursesComponent implements OnInit {
  student: Student;
  teacherCourses: TeacherCourse[];
  parentId: number;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.parentId = +this.route.parent.snapshot.paramMap.get('id');
    this.student = new Student();
    this.getStudent();
    this.getCoursesForStudent();
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id).subscribe(student => this.student = student);
  }

  getCoursesForStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getCoursesForStudent(id).subscribe(teacherCourses => this.teacherCourses = teacherCourses);
  }

}
