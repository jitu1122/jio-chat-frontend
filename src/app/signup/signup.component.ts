import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../auth/user.service';
// import {UserService} from '../auth/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.user.registerUser(this.signUpForm.value).subscribe((res: any) => {
        if (res && res.token) {
          this.router.navigate(['dashboard']);
        }
      });
    }
  }
}
