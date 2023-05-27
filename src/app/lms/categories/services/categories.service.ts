import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Category } from '../models.ts/category.class';
import { from, map } from 'rxjs';
import { collection, getCountFromServer } from 'firebase/firestore';

@Injectable()
export class CategoriesService {
  private _collectionName: string;
  private _collection: AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore) {
    this._collectionName = 'categories';
    this._collection = this.fireStore.collection<Category>(this._collectionName);
  }

  create(category: Category) {
    category.id = this.fireStore.createId();
    return from(this._collection.add(category));
  }

  get(id: string) {
    return this._collection.doc(id).valueChanges();
  }

  getCount() {
    const collectionRef = collection(this.fireStore.firestore, this._collectionName);
    return from(getCountFromServer(collectionRef)).pipe(
      map(res => res.data().count)
    );
  }

  getList() {
    return this._collection.valueChanges();
  }

  delete(id: string) {
    return from(this._collection.doc(id).delete());
  }

  update(category: Category) {
    return from(this._collection.doc(category.id).update(category));
  }
}
