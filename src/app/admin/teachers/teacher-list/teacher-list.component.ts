import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from '../../../../services/teacher.service';
import { Teacher } from '../../../../models/teacher';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';
import { Observable } from 'rxjs';
import { NewUser } from '../../../../models/newuser';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  teachers: Teacher[];
  usernames: string[];
  newTeacher: NewUser;
  existingUsername: boolean;
  passwordMissmatch: boolean;
  addedTeacher: boolean;

  constructor(
    private teacherService: TeacherService,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getTeachers();
    this.getAllUsernames();
    this.newTeacher = new NewUser();
    this.existingUsername = false;
    this.passwordMissmatch = false;
    this.addedTeacher = false;
  }

  getTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(teachers => this.teachers = teachers);
  }

  open(content) {
    this.existingUsername = false;
    this.passwordMissmatch = false;
    this.addedTeacher = false;
    this.newTeacher = new NewUser();
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

  addTeacher() {
    this.existingUsername = false;
    this.passwordMissmatch = false;
    if (this.usernameExists(this.newTeacher.username)) {
      this.existingUsername = true;
    } else if (!(this.newTeacher.password === this.newTeacher.confirmedPassword)) {
        this.passwordMissmatch = true;
    } else {
      this.teacherService.addTeacher(this.newTeacher).subscribe(
        data => {
          this.getTeachers();
          this.addedTeacher = true;
          this.passwordMissmatch = false;
          this.existingUsername = false;
        }
      );
    }
  }

  deleteTeacher(id: number, firstName: string, lastName: string) {
    if (confirm(`Da li ste sigurni da želite da uklonite profesora ${firstName} ${lastName}?`)) {
      this.teacherService.deleteTeacher(id).subscribe(data => this.getTeachers());
    }
  }

}
