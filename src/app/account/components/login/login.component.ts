import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(formBuilder: FormBuilder, private accountService: AccountService, private router: Router) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  login() {
    if (this.form.invalid) return;
    this.accountService.login(this.form.value).subscribe(_ => {
      this.router.navigateByUrl('home');
    });
  }
  register(event: Event) {
    event.preventDefault();
  }
}
