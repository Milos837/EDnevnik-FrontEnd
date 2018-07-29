import { Teacher } from './teacher';
import { Course } from './course';

export class TeacherCourse {
  id?: number;
  teacher: Teacher;
  course: Course;
}
