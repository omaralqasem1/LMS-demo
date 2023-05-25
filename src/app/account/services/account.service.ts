import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { IUser } from '../models/user.interface';
import { ILoginForm } from '../models/login-form.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private fireAuth: AngularFireAuth) {
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

  login(login: ILoginForm): Observable<any> {
    return from(this.fireAuth.signInWithEmailAndPassword(login.email, login.password));
  }

  signUp(user: IUser) {
    const { email, password } = user;
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password));
  }


}
