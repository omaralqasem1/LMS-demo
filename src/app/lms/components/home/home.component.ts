import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories/services/categories.service';
import { Observable } from 'rxjs';
import { BooksService } from '../../books/services/books.service';
import { AuthorsService } from '../../books/services/authors.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CategoriesService]
})
export class HomeComponent implements OnInit {
  categoriesCount$: Observable<number>;
  booksCount$: Observable<number>;
  authorsCount$: Observable<number>;

  constructor(categoriesService: CategoriesService, booksService: BooksService, authorsService: AuthorsService) {
    this.categoriesCount$ = categoriesService.getCount();
    this.booksCount$ = booksService.getCount();
    this.authorsCount$ = authorsService.getCount();
  }

  ngOnInit(): void {
  }

}
