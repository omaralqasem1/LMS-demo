import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.class';
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
  deleteSubscription!: Subscription;
  updateSubscription!: Subscription;
  selectedCategory!: Category;
  countSubscription!: Subscription;
  isLoading: boolean;
  hasError: boolean;
  hasData: boolean;

  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) {
    this.displayedColumns = ['name', 'options'];
    this.count = 0;
    this.list = [];
    this.pageIndex = 0;
    this.pageSize = 2;
    this.isLoading = true;
    this.hasError = false;
    this.hasData = false;
  }

  ngOnDestroy(): void {
    this.getListSubscription.unsubscribe();
    this.countSubscription.unsubscribe();
    if (this.deleteSubscription)
      this.deleteSubscription.unsubscribe();
    if (this.updateSubscription)
      this.updateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.get(q => {
      return q.orderBy('id').limit(this.pageSize);
    });
    this.countSubscription = this.categoriesService.getCount().subscribe(count => {
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
            this.hasData = res.length > 0;
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
    if (this.list.length == 1) {
      this.pageIndex = 0;
      this.get(q => {
        return q.orderBy('id').limit(this.pageSize);
      });
    }
    if (this.deleteSubscription)
      this.deleteSubscription.unsubscribe();
    this.deleteSubscription = this.categoriesService.delete(category.id).subscribe(_ => {
      this.count--;
    });
  }

  update(category: Category) {
    if (this.updateSubscription)
      this.updateSubscription.unsubscribe();
    this.updateSubscription = this.categoriesService.update(category).subscribe();
  }

  add(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.count++;
    });
  }


}
