import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { Category } from '../models.ts/category.class';
import { from, map } from 'rxjs';
import { collection, getCountFromServer } from 'firebase/firestore';

@Injectable()
export class CategoriesService {
  private _collectionName: string;

  constructor(private fireStore: AngularFirestore) {
    this._collectionName = 'categories';
  }

  create(category: Category) {
    return from(this.fireStore.doc(`${this._collectionName}/${category.id}`).set({ ...category }));
  }

  get(id: string) {
    return this.fireStore.collection<Category>(this._collectionName).doc(id).valueChanges();
  }

  getCount() {
    const collectionRef = collection(this.fireStore.firestore, this._collectionName);
    return from(getCountFromServer(collectionRef)).pipe(
      map(res => res.data().count)
    );
  }

  getList(queryFn?: QueryFn) {
    return this.fireStore.collection<Category>(this._collectionName, queryFn).valueChanges();
  }

  delete(id: string) {
    return from(this.fireStore.collection<Category>(this._collectionName).doc(id).delete());
  }

  update(category: Category) {
    return from(this.fireStore.collection<Category>(this._collectionName).doc(category.id).update(category));
  }
}
