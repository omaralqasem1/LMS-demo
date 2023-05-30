import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models.ts/category.class';
import { PageEvent } from '@angular/material/paginator';
import { QueryFn } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  list: Category[];
  displayedColumns: string[];
  count: number;
  pageIndex: number;
  pageSize: number;
  getListSubscription!: Subscription;
  selectedCategory!: Category;
  isLoading: boolean;
  hasError: boolean;


  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) {
    this.displayedColumns = ['name', 'options'];
    this.count = 0;
    this.list = [];
    this.pageIndex = 0;
    this.pageSize = 10;
    this.isLoading = true;
    this.hasError = false;
  }

  ngOnDestroy(): void {
    if (this.getListSubscription)
      this.getListSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.get(q => {
      return q.orderBy('id').limit(this.pageSize);
    });
    this.categoriesService.getCount().subscribe(count => {
      this.count = count;
    });
  }

  get(queryFn?: QueryFn) {
    this.isLoading = true;
    this.hasError = false;
    if (this.getListSubscription)
      this.getListSubscription.unsubscribe();
    this.getListSubscription =
      this.categoriesService.getList(queryFn).subscribe(
        {
          next: res => {
            this.list = res;
            this.hasError = false;
            this.isLoading = false;
          },
          error: _ => {
            this.hasError = true;
            this.isLoading = false;
          }
        }
      );
  }

  nextPage() {
    const lastDoc = this.list[this.list.length - 1];
    this.get(q => {
      return q.orderBy('id').startAfter(lastDoc.id)
        .limit(this.pageSize);
    });
  }

  prevPage() {
    const firstDoc = this.list[0];
    this.get(q => {
      return q.orderBy('id').endBefore(firstDoc.id)
        .limitToLast(this.pageSize);
    });
  }

  changePage(pageEvent: PageEvent) {
    if (this.pageIndex < pageEvent.pageIndex) {
      this.nextPage();
    } else {
      this.prevPage();
    }
    this.pageIndex = pageEvent.pageIndex;
  }

  delete(category: Category) {
    this.categoriesService.delete(category.id).subscribe(_ => {
      this.count--;
    });
  }

  update(category: Category) {
    this.categoriesService.update(category).subscribe(_ => {
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '300px',
      data: null,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.count++;
    });
  }


}
