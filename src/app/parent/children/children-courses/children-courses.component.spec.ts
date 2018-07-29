import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenCoursesComponent } from './children-courses.component';

describe('ChildrenCoursesComponent', () => {
  let component: ChildrenCoursesComponent;
  let fixture: ComponentFixture<ChildrenCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
