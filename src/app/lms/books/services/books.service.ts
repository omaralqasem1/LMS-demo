import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IBook } from '../models/book.interface';
import { CrudOperations } from 'src/app/shared/classes/crud-operations';
import { Collection } from 'src/app/shared/models/collection';

@Injectable({
  providedIn: 'root'
})
export class BooksService extends CrudOperations<IBook> {

  constructor(fireStore: AngularFirestore) {
    super(fireStore, Collection.books);
  }
}
