import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { IBook } from '../models/book.interface';
import { from, map } from 'rxjs';
import { QueryFieldFilterConstraint, collection, getCountFromServer, query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _collectionName: string;

  constructor(private fireStore: AngularFirestore) {
    this._collectionName = 'books';
  }

  create(book: IBook) {
    const id = this.fireStore.createId();
    return from(this.fireStore.doc(`${this._collectionName}/${id}`).set({ ...book, id }));
  }

  get(id: string) {
    return this.fireStore.collection<IBook>(this._collectionName).doc(id).valueChanges();
  }

  getCount(fieldFilter?: QueryFieldFilterConstraint) {
    const collectionRef = collection(this.fireStore.firestore, this._collectionName);
    const collQuery = fieldFilter ? query(collectionRef, fieldFilter) : collectionRef;
    return from(getCountFromServer(collQuery)).pipe(
      map(res => res.data().count)
    );
  }

  getList(queryFn?: QueryFn) {
    return this.fireStore.collection<IBook>(this._collectionName, queryFn).valueChanges();
  }

  delete(id: string) {
    return from(this.fireStore.collection<IBook>(this._collectionName).doc(id).delete());
  }

  update(book: IBook) {
    return from(this.fireStore.collection<IBook>(this._collectionName).doc(book.id).update(book));
  }
}
