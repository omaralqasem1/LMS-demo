import { Injectable } from '@angular/core';
import { CrudOperations } from 'src/app/shared/classes/crud-operations';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IAuthor } from '../models/author.interface';
import { Collection } from 'src/app/shared/models/collection';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends CrudOperations<IAuthor> {

  constructor(fireStore: AngularFirestore) {
    super(fireStore, Collection.authors);
  }
}
