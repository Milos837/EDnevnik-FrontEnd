import { Component, OnInit } from '@angular/core';
import { Parent } from '../../../../models/parent';
import { NewUser } from '../../../../models/newuser';
import { ParentService } from '../../../../services/parent.service';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  parents: Parent[];
  usernames: string[];
  newParent: NewUser;
  existingUsername: boolean;
  passwordMissmatch: boolean;
  addedParent: boolean;

  constructor(
    private parentService: ParentService,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getParents();
    this.getAllUsernames();
    this.newParent = new NewUser();
    this.existingUsername = false;
    this.passwordMissmatch = false;
    this.addedParent = false;
  }

  getParents(): void {
    this.parentService.getAllParents().subscribe(parents => this.parents = parents);
  }

  open(content) {
    this.existingUsername = false;
    this.passwordMissmatch = false;
    this.addedParent = false;
    this.newParent = new NewUser();
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

  addParent() {
    this.existingUsername = false;
    this.passwordMissmatch = false;
    if (this.usernameExists(this.newParent.username)) {
      this.existingUsername = true;
    } else if (!(this.newParent.password === this.newParent.confirmedPassword)) {
        this.passwordMissmatch = true;
    } else {
      this.parentService.addParent(this.newParent).subscribe(
        data => {
          this.getParents();
          this.addedParent = true;
          this.passwordMissmatch = false;
          this.existingUsername = false;
        }
      );
    }
  }

  deleteParent(id: number, firstName: string, lastName: string) {
    if (confirm(`Da li ste sigurni da želite da uklonite roditelja ${firstName} ${lastName}?`)) {
      this.parentService.deleteParent(id).subscribe(data => this.getParents());
    }
  }

}
