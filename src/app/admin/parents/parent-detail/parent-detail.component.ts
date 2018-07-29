import { Component, OnInit, Input } from '@angular/core';
import { Parent } from '../../../../models/parent';
import { NgbModalRef, NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ParentService } from '../../../../services/parent.service';
import { Location } from '../../../../../node_modules/@angular/common';
import { NewUser } from '../../../../models/newuser';
import { Student } from '../../../../models/student';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-parent-detail',
  templateUrl: './parent-detail.component.html',
  styleUrls: ['./parent-detail.component.css']
})
export class ParentDetailComponent implements OnInit {
  @Input() parent: Parent;
  children: Student[];
  allStudents: Student[];
  newstudent: Student;
  formDisabled: boolean;
  updated: boolean;
  greska: boolean;
  dodat: boolean;
  modalReference: NgbModalRef;

  constructor(
    private route: ActivatedRoute,
    private parentService: ParentService,
    private location: Location,
    private modalService: NgbModal,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.parent = new Parent();
    this.newstudent = new Student();
    this.getParent();
    this.formDisabled = true;
    this.updated = false;
    this.getChildren();
    this.getAllStudents();
  }

  getParent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.parentService.getParent(id).subscribe(parent => this.parent = parent);
  }

  goBack(): void {
    this.location.back();
  }

  open(content) {
    this.dodat = false;
    this.greska = false;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  updateParent(): void {
    const parentId = +this.route.snapshot.paramMap.get('id');
    const updatedParent: NewUser = new NewUser();
    updatedParent.firstName = this.parent.firstName;
    updatedParent.lastName = this.parent.lastName;
    updatedParent.email = this.parent.email;
    updatedParent.username = 'tempvalue';
    updatedParent.password = 'tempvalue';
    updatedParent.confirmedPassword = 'tempvalue';
    this.parentService.updateParent(parentId, updatedParent).subscribe(
      data => {
        this.updated = true;
        this.formDisabled = true;
      });
  }

  getChildren(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.parentService.getChildren(id).subscribe(children => this.children = children);
  }

  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe(allStudents => this.allStudents = allStudents);
  }

  alreadyMember(newstudent: Student): boolean {
    for (const student of this.children) {
      if (student.id === newstudent.id) {
        return true;
      }
    }
    return false;
  }

  addChild(): void {
    if (!this.alreadyMember(this.newstudent)) {
      this.greska = false;
      const parentId = +this.route.snapshot.paramMap.get('id');
      const studentId = this.newstudent.id;
      this.studentService.addParent(studentId, parentId).subscribe(
        data => {
          this.getChildren();
          this.dodat = true;
         });
    } else {
      this.greska = true;
    }
    /* this.modalReference.close(); */
  }

}
