import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IBook } from '../models/book.interface';
import { BooksService } from '../services/books.service';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsResolver implements Resolve<IBook | undefined> {
  constructor(private booksService: BooksService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBook | undefined> {
    const id = route.params['id'];
    return this.booksService.get(id).pipe(
      tap(book => {
        if (!book) throw new Error('not exist');
      }),
      catchError(error => {
        this.router.navigate(['books']);
        return throwError(() => error);
      })
    );
  }
}
