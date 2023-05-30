import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models.ts/category.class';
import { CrudOperations } from 'src/app/shared/classes/crud-operations';
import { Collection } from 'src/app/shared/models/collection';

@Injectable()
export class CategoriesService extends CrudOperations<Category> {

  constructor(fireStore: AngularFirestore) {
    super(fireStore, Collection.categories);
  }
}
