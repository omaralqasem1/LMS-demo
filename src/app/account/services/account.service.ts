import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, map, mergeMap, of } from 'rxjs';
import { IUser } from '../models/user.interface';
import { ILoginForm } from '../models/login-form.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private fireAuth: AngularFireAuth, private usersService: UsersService) {
    // this.fireAuth.currentUser.then(res => {
    //   console.log('currentUser ', res)
    // })
    // this.fireAuth.authState.subscribe(res => {
    //   console.log('authState ', res)
    //   console.log((res?.toJSON() as any)['stsTokenManager']['expirationTime'])
    // })
    // this.fireAuth.config.then(res => {
    //   console.log('config ', res)
    // })
    // this.fireAuth.credential.subscribe(res => {
    //   console.log('credential ', res);
    // })
    // this.fireAuth.user.subscribe(res => {
    //   console.log('user ', res);
    // })
  }

  get userInfo$(): Observable<IUser> {
    let user: any;
    return this.fireAuth.authState.pipe(
      mergeMap(authState => {
        user = {
          email: authState ? authState.email : null,
          id: authState ? authState.uid : null,
          isAuthenticated: authState ? true : false
        };
        if (!authState) return of(null);
        return this.usersService.get(authState?.uid)
      }),
      map((res: any) => {
        return <IUser>{
          ...user,
          ...res,
        }
      })
    );
  }

  login(login: ILoginForm): Observable<any> {
    return from(this.fireAuth.signInWithEmailAndPassword(login.email, login.password));
  }

  signUp(user: IUser) {
    const { email, password } = user;
    let userCredential: any;
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password)).pipe(
      mergeMap(res => {
        userCredential = res;
        user.id = <string>res.user?.uid;
        return this.usersService.create(user);
      }),
      map(_ => userCredential)
    );
  }

  signOut() {
    return from(this.fireAuth.signOut());
  }

}
