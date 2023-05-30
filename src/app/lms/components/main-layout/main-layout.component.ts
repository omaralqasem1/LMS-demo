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
  email$: Observable<string>;

  constructor(private accountService: AccountService) {
    const userInfo$ = accountService.userInfo$;
    this.isLoggedIn$ = userInfo$.pipe(
      map(user => user && user.isAuthenticated)
    );
    this.firstName$ = userInfo$.pipe(
      map(user => user.firstName)
    );
    this.lastName$ = userInfo$.pipe(
      map(user => user.lastName || '')
    );
    this.email$ = userInfo$.pipe(
      map(user => user.email)
    )
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.signOut().subscribe();
  }
}
