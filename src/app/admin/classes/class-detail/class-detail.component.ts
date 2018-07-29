import { Component, OnInit, Input } from '@angular/core';
import { Class } from '../../../../models/class';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Location } from '../../../../../node_modules/@angular/common';
import { ClassService } from '../../../../services/class.service';
import { Student } from '../../../../models/student';
import { StudentService } from '../../../../services/student.service';
import { NgbModal, NgbModalRef } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {
  @Input() uclass: Class;
  @Input() students: Student[];
  @Input() allStudents: Student[];
  newstudent: Student;
  formDisabled: boolean;
  updated: boolean;
  greska: boolean;
  dodat: boolean;
  modalReference: NgbModalRef;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private classService: ClassService,
    private modalService: NgbModal,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.uclass = new Class();
    this.getClass();
    this.formDisabled = true;
    this.updated = false;
    this.getStudentsForClass();
    this.getAllStudents();
    this.newstudent = new Student();
  }

  getClass(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id).subscribe(uclass => this.uclass = uclass);
  }

  goBack(): void {
    this.location.back();
  }

  open(content) {
    this.dodat = false;
    this.greska = false;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  updateClass(): void {
    const classId = +this.route.snapshot.paramMap.get('id');
    const classNumber: string = this.uclass.classNumber;
    this.uclass.id = null;
    this.uclass.classNumber = '9';
    this.classService.updateClass(classId, this.uclass).subscribe(
      data => {
        this.updated = true;
        this.formDisabled = true;
        this.uclass.classNumber = classNumber;
      });
  }

  getStudentsForClass(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.classService.getStudentsForClass(id).subscribe(students => this.students = students);
  }

  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe(allStudents => this.allStudents = allStudents);
  }

  alreadyMember(newstudent: Student): boolean {
    for (const student of this.students) {
      if (student.id === newstudent.id) {
        return true;
      }
    }
    return false;
  }

  addStudent(): void {
    if (!this.alreadyMember(this.newstudent)) {
      this.greska = false;
      const classId = +this.route.snapshot.paramMap.get('id');
      const studentId = this.newstudent.id;
      this.studentService.addClassForStudent(studentId, classId).subscribe(
        data => {
          this.getStudentsForClass();
          this.dodat = true;
         });
    } else {
      this.greska = true;
    }
    /* this.modalReference.close(); */
  }

}
