import { AngularFirestore, QueryFn } from "@angular/fire/compat/firestore";
import { QueryFieldFilterConstraint, collection, getCountFromServer, query } from "firebase/firestore";
import { from, map } from "rxjs";
import { Collection } from "../models/collection";

export class CrudOperations<T extends { id: string }> {

    protected collection: Collection;

    constructor(protected fireStore: AngularFirestore, collection: Collection) {
        this.collection = collection;
    }

    create(item: T) {
        const id = this.fireStore.createId();
        return from(this.fireStore.doc(`${this.collection}/${id}`).set({ ...item, id }));
    }

    get(id: string) {
        return this.fireStore.collection<T>(this.collection).doc(id).valueChanges();
    }

    getCount(fieldFilter?: QueryFieldFilterConstraint) {
        const collectionRef = collection(this.fireStore.firestore, this.collection);
        const collQuery = fieldFilter ? query(collectionRef, fieldFilter) : collectionRef;
        return from(getCountFromServer(collQuery)).pipe(
            map(res => res.data().count)
        );
    }

    getList(queryFn?: QueryFn) {
        return this.fireStore.collection<T>(this.collection, queryFn).valueChanges();
    }

    delete(id: string) {
        return from(this.fireStore.collection<T>(this.collection).doc(id).delete());
    }

    update(item: T) {
        return from(this.fireStore.collection<T>(this.collection).doc(item.id).update(item));
    }
}
