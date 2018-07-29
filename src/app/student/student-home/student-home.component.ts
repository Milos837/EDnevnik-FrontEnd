import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  studentId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.studentId = +this.route.snapshot.paramMap.get('id');
  }

}
