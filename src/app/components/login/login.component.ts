import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usersArr!: User[];
  loginForm!: FormGroup;
  logedUser: any;

  constructor(public loginService: LoginService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginService.getAllUsers().subscribe((response) => {
      this.usersArr = response;
    })

    this.buildForm();

  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    })
  }

  public submit(form: FormGroup) {
    form.markAllAsTouched();
    if(form.valid) {

        this.logedUser = this.usersArr.find((un: any) => un.username === form.value.username && un.email === form.value.email)
        if(this.logedUser) {
          Swal.fire(`welcome ${form.value.username}`);
          this.loginService.setUser(this.logedUser);
          this.router.navigate(['/to-do-list']);
        }else Swal.fire(`user does not exist`);

      }else {
       Swal.fire(`incorect details`);
      }


    }

  }




