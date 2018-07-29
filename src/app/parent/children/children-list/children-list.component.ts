import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../models/student';
import { ParentService } from '../../../../services/parent.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.css']
})
export class ChildrenListComponent implements OnInit {
  students: Student[];
  parentId: number;

  constructor(
    private parentService: ParentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getChildren();
    this.parentId = +this.route.parent.snapshot.paramMap.get('id');
  }

  getChildren(): void {
    const id = +this.route.parent.snapshot.paramMap.get('id');
    this.parentService.getChildren(id).subscribe(students => this.students = students);
  }

}
