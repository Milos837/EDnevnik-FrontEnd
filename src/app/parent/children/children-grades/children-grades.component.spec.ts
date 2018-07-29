import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenGradesComponent } from './children-grades.component';

describe('ChildrenGradesComponent', () => {
  let component: ChildrenGradesComponent;
  let fixture: ComponentFixture<ChildrenGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
