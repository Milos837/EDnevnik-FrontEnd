import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../models/student';
import { NewUser } from '../../../../models/newuser';
import { StudentService } from '../../../../services/student.service';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[];
  usernames: string[];
  newStudent: NewUser;
  existingUsername: boolean;
  passwordMissmatch: boolean;
  addedStudent: boolean;

  constructor(
    private studentService: StudentService,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getStudents();
    this.getAllUsernames();
    this.newStudent = new NewUser();
    this.existingUsername = false;
    this.passwordMissmatch = false;
    this.addedStudent = false;
  }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe(students => this.students = students);
  }

  open(content) {
    this.existingUsername = false;
    this.passwordMissmatch = false;
    this.addedStudent = false;
    this.newStudent = new NewUser();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  getAllUsernames(): void {
    this.authService.getAllUsernames().subscribe(usernames => this.usernames = usernames);
  }

  usernameExists(username: string): boolean {
    for (const u of this.usernames) {
      if (u === username) {
        return true;
      }
    }
    return false;
  }

  addStudent() {
    this.existingUsername = false;
    this.passwordMissmatch = false;
    if (this.usernameExists(this.newStudent.username)) {
      this.existingUsername = true;
    } else if (!(this.newStudent.password === this.newStudent.confirmedPassword)) {
        this.passwordMissmatch = true;
    } else {
      this.studentService.addStudent(this.newStudent).subscribe(
        data => {
          this.getStudents();
          this.addedStudent = true;
          this.passwordMissmatch = false;
          this.existingUsername = false;
        }
      );
    }
  }

  deleteStudent(id: number, firstName: string, lastName: string) {
    if (confirm(`Da li ste sigurni da želite da uklonite učenika ${firstName} ${lastName}?`)) {
      this.studentService.deleteStudent(id).subscribe(data => this.getStudents());
    }
  }

}
