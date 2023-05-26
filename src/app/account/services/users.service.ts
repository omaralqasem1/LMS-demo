import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from '../models/user.interface';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _collectionName: string;

  constructor(private fireStore: AngularFirestore) {
    this._collectionName = 'users';
  }

  create(user: IUser) {
    const { firstName, lastName } = user;
    return from(this.fireStore.doc(`${this._collectionName}/${user.id}`).set({ firstName, lastName }));
  }

  get(id: string) {
    return this.fireStore.collection(this._collectionName).doc(id).valueChanges();
  }
}
