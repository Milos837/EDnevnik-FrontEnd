import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/home/admin.component';
import { StartComponent } from './shared/start/start.component';
import { TeacherListComponent } from './admin/teachers/teacher-list/teacher-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { TeacherDetailComponent } from './admin/teachers/teacher-detail/teacher-detail.component';
import { CourseListComponent } from './admin/courses/course-list/course-list.component';
import { CourseDetailComponent } from './admin/courses/course-detail/course-detail.component';
import { ClassListComponent } from './admin/classes/class-list/class-list.component';
import { ClassDetailComponent } from './admin/classes/class-detail/class-detail.component';
import { StudentListComponent } from './admin/students/student-list/student-list.component';
import { StudentDetailComponent } from './admin/students/student-detail/student-detail.component';
import { ParentListComponent } from './admin/parents/parent-list/parent-list.component';
import { ParentDetailComponent } from './admin/parents/parent-detail/parent-detail.component';
import { AdminLogComponent } from './admin/admin-log/admin-log.component';
import { StudentGradesComponent } from './admin/students/student-grades/student-grades.component';
import { ParentHomeComponent } from './parent/parent-home/parent-home.component';
import { ChildrenListComponent } from './parent/children/children-list/children-list.component';
import { ChildrenCoursesComponent } from './parent/children/children-courses/children-courses.component';
import { ChildrenGradesComponent } from './parent/children/children-grades/children-grades.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentCoursesComponent } from './student/student-courses/student-courses.component';
import { StudentGradesListComponent } from './student/student-grades-list/student-grades-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavbarComponent,
    AdminComponent,
    StartComponent,
    TeacherListComponent,
    NotFoundComponent,
    TeacherDetailComponent,
    CourseListComponent,
    CourseDetailComponent,
    ClassListComponent,
    ClassDetailComponent,
    StudentListComponent,
    StudentDetailComponent,
    ParentListComponent,
    ParentDetailComponent,
    AdminLogComponent,
    StudentGradesComponent,
    ParentHomeComponent,
    ChildrenListComponent,
    ChildrenCoursesComponent,
    ChildrenGradesComponent,
    StudentHomeComponent,
    StudentCoursesComponent,
    StudentGradesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
