import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isLoggedIn!: boolean;
  firstName!: string;
  lastName!: string;
  email!: string;
  userSubscription: Subscription;

  constructor(private accountService: AccountService) {
    this.userSubscription = accountService.userInfo$.subscribe(user => {
      this.isLoggedIn = user && user.isAuthenticated;
      this.firstName = user.firstName;
      this.lastName = user.lastName || '';
      this.email = user.email;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.signOut().subscribe();
  }
}
