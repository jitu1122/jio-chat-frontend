import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  submitted = false;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      remember: ['']
    });
  }
  get f() { return this.signInForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signInForm.valid) {
      this.user.loginUser(this.signInForm.value).subscribe((res: any) => {
        if (res && res.token) {
          this.router.navigate(['dashboard']);
        }
      });
    }
  }
}
