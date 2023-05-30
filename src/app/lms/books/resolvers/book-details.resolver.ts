import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IBook } from '../models/book.interface';
import { BooksService } from '../services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class BookDetailsResolver implements Resolve<IBook | undefined> {
  constructor(private booksService: BooksService, private router: Router, private _snackBar: MatSnackBar) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBook | undefined> {
    const id = route.params['id'];
    return this.booksService.get(id).pipe(
      tap(book => {
        if (!book) throw new Error('not exist');
      }),
      catchError(error => {
        this._snackBar.open("Book not found!", undefined, {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['bg-danger', 'text-white', 'fw-bold', 'm-5', 'p-3']
        });
        this.router.navigate(['books']);
        return throwError(() => error);
      })
    );
  }
}
