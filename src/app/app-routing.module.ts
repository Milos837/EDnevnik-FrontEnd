import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminComponent } from './admin/home/admin.component';
import { StartComponent } from './shared/start/start.component';
import { TeacherListComponent } from './admin/teachers/teacher-list/teacher-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { TeacherDetailComponent } from './admin/teachers/teacher-detail/teacher-detail.component';
import { AdminFilterService } from '../services/filters/admin-filter.service';
import { CourseListComponent } from './admin/courses/course-list/course-list.component';
import { CourseDetailComponent } from './admin/courses/course-detail/course-detail.component';
import { ClassListComponent } from './admin/classes/class-list/class-list.component';
import { ClassDetailComponent } from './admin/classes/class-detail/class-detail.component';
import { StudentListComponent } from './admin/students/student-list/student-list.component';
import { StudentDetailComponent } from './admin/students/student-detail/student-detail.component';
import { ParentListComponent } from './admin/parents/parent-list/parent-list.component';
import { ParentDetailComponent } from './admin/parents/parent-detail/parent-detail.component';
import { AdminLogComponent } from './admin/admin-log/admin-log.component';
import { ParentHomeComponent } from './parent/parent-home/parent-home.component';
import { ParentFilterService } from '../services/filters/parent-filter.service';
import { ChildrenListComponent } from './parent/children/children-list/children-list.component';
import { ChildrenCoursesComponent } from './parent/children/children-courses/children-courses.component';
import { ChildrenGradesComponent } from './parent/children/children-grades/children-grades.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentFilterService } from '../services/filters/student-filter.service';
import { StudentCoursesComponent } from './student/student-courses/student-courses.component';
import { StudentGradesListComponent } from './student/student-grades-list/student-grades-list.component';
import { StudentGradesComponent } from './admin/students/student-grades/student-grades.component';


const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminFilterService], children: [
    { path: '', component: StartComponent },
    { path: 'teachers', component: TeacherListComponent },
    { path: 'teachers/:id', component: TeacherDetailComponent },
    { path: 'courses', component: CourseListComponent },
    { path: 'courses/:id', component: CourseDetailComponent },
    { path: 'classes', component: ClassListComponent },
    { path: 'classes/:id', component: ClassDetailComponent },
    { path: 'students', component: StudentListComponent },
    { path: 'students/:id', component: StudentDetailComponent },
    { path: 'students/:studentId/courses/:teacherCourseId', component: StudentGradesComponent },
    { path: 'parents', component: ParentListComponent },
    { path: 'parents/:id', component: ParentDetailComponent },
    { path: 'logs', component: AdminLogComponent }
  ] },
  { path: 'parent/:id', component: ParentHomeComponent, canActivate: [ParentFilterService], children: [
    { path: '', component: StartComponent },
    { path: 'children', component: ChildrenListComponent },
    { path: 'children/:id/courses', component: ChildrenCoursesComponent },
    { path: 'children/:studentId/courses/:tcId/grades', component: ChildrenGradesComponent }
  ] },
  { path: 'student/:id', component: StudentHomeComponent, canActivate: [StudentFilterService], children: [
    { path: '', component: StartComponent },
    { path: 'courses', component: StudentCoursesComponent },
    { path: 'courses/:tcId/grades', component: StudentGradesListComponent}
  ] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
