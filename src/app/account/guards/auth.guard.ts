import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch {
  constructor(private accountService: AccountService, private router: Router) { }

  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.userInfo$.pipe(
      map(user => user && user.isAuthenticated),
      tap(authenticated => {
        if (authenticated) return;
        this.router.navigateByUrl('account/login');
      })
    );
  }
}
