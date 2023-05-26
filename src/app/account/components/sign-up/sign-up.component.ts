import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(formBuilder: FormBuilder, private accountService: AccountService, private users: UsersService) {
    this.form = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator.bind(this)]]
    })
  }

  ngOnInit(): void {

  }

  register() {
    if (this.form.invalid) return;
    this.accountService.signUp(this.form.value).subscribe();
  }

  matchPasswordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const password = this.form.value.password;
    return password == control.value ? null : {
      passwordDoesNotMatch: true
    }
  };

}
