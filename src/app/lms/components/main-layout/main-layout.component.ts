import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  firstName$: Observable<string>;
  lastName$: Observable<string>;

  constructor(private accountService: AccountService) {
    this.isLoggedIn$ = accountService.userInfo$.pipe(
      map(user => user && user.isAuthenticated)
    );
    this.firstName$ = accountService.userInfo$.pipe(
      map(user => user.firstName)
    );
    this.lastName$ = accountService.userInfo$.pipe(
      map(user => user.lastName || '')
    );
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.signOut().subscribe();
  }
}
