import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  model: any = {};
  loading = false;
  loginFailed = false;

  constructor(private router: Router, private authenticationService: AuthService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loginFailed = false;
    this.loading = true;
    this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.loading = false;
          if (data) {
            this.authenticationService.saveCredentials(this.model.username, this.model.password, data['role']);
            if (data['role'] === 'ROLE_ADMIN') {
              this.router.navigate(['/admin']);
            } else if (data['role'] === 'ROLE_PARENT') {
              this.router.navigate([`/parent/${data['id']}`]);
            } else if (data['role'] === 'ROLE_STUDENT') {
              this.router.navigate([`/student/${data['id']}`]);
            } else if (data['role'] === 'ROLE_TEACHER') {
              this.router.navigate([`/teacher/${data['id']}`]);
            }
          } else {
            console.error(data);
          }
        },
        error => {
          console.error(error);
          this.loading = false;
          this.loginFailed = true;
        }
    );
  }


}
