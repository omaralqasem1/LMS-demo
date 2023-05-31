import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from '../models/user.interface';
import { from, map } from 'rxjs';
import { getCountFromServer, collection } from 'firebase/firestore';

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

  getCount() {
    const collectionRef = collection(this.fireStore.firestore, this._collectionName);
    return from(getCountFromServer(collectionRef)).pipe(
      map(res => res.data().count)
    );
  }
}
