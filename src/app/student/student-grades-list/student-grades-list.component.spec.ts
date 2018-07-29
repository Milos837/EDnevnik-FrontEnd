import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradesListComponent } from './student-grades-list.component';

describe('StudentGradesListComponent', () => {
  let component: StudentGradesListComponent;
  let fixture: ComponentFixture<StudentGradesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGradesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
