import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../../services/class.service';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Class } from '../../../../models/class';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: Class[];
  newClass: Class;
  addedClass: boolean;

  constructor(private classService: ClassService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getClasses();
    this.addedClass = false;
  }

  open(content) {
    this.addedClass = false;
    this.newClass = new Class();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  getClasses(): void {
    this.classService.getAllClasses().subscribe(classes => this.classes = classes);
  }

  deleteClass(id: number, className: string) {
    if (confirm(`Da li ste sigurni da želite da uklonite odeljenje broj ${className}?`)) {
      this.classService.deleteClass(id).subscribe(data => this.getClasses());
    }
  }

  addClass(): void {
    this.classService.addClass(this.newClass).subscribe(
      data => {
        this.getClasses();
        this.addedClass = true;
      }
    );
  }

}
