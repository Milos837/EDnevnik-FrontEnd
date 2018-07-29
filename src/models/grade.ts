import { StudentTeacherCourse } from './studentteachercourse';

export class Grade {
  id?: number;
  value: string;
  type: string;
  dateUTC: string;
  studentTeacherCourse: StudentTeacherCourse;
}
