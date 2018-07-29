import { Student } from './student';
import { TeacherCourse } from './teachercourse';

export class StudentTeacherCourse {
  id?: number;
  student: Student;
  teacherCourse: TeacherCourse;
}
