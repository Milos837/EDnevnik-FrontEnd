import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-parent-home',
  templateUrl: './parent-home.component.html',
  styleUrls: ['./parent-home.component.css']
})
export class ParentHomeComponent implements OnInit {
  parentId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.parentId = +this.route.snapshot.paramMap.get('id');
  }

}
