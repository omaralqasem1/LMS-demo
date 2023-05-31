import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBook } from '../../models/book.interface';
import { BooksService } from '../../services/books.service';
import { Category } from 'src/app/lms/categories/models/category.class';
import { CategoriesService } from 'src/app/lms/categories/services/categories.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  displayedColumns: string[];
  getListSubscription!: Subscription;
  list: IBook[];
  categories$: Observable<Category[]>;
  isLoading: boolean;
  hasError: boolean;
  hasData: boolean;
  categorySelected: boolean;

  constructor(private booksService: BooksService, categoriesService: CategoriesService) {
    this.displayedColumns = ['name'];
    this.list = [];
    this.categories$ = categoriesService.getList();
    this.isLoading = false;
    this.hasError = false;
    this.hasData = false;
    this.categorySelected = false;
  }

  ngOnDestroy(): void {
    if (this.getListSubscription)
      this.getListSubscription.unsubscribe();
  }

  ngOnInit(): void { }

  selectCategory(event: MatSelectChange) {
    this.isLoading = true;
    this.hasError = false;
    this.categorySelected = true;
    if (this.getListSubscription)
      this.getListSubscription.unsubscribe();
    this.getListSubscription =
      this.booksService.getList(q => {
        return q.where('categoryId', '==', event.value)
      }).subscribe(
        {
          next: res => {
            this.list = res;
            this.isLoading = false;
            this.hasError = false;
            this.hasData = this.list.length > 0;
          },
          error: _ => {
            this.isLoading = false;
            this.hasError = true;
          }
        }
      );
  }
}
