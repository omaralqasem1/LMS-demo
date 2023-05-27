import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models.ts/category.class';
import { PageEvent } from '@angular/material/paginator';
import { QueryFn } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

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


  constructor(private categoriesService: CategoriesService) {
    this.displayedColumns = ['name', 'options'];
    this.count = 0;
    this.list = [];
    this.pageIndex = 0;
    this.pageSize = 1;
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
    if (this.getListSubscription)
      this.getListSubscription.unsubscribe();
    this.getListSubscription =
      this.categoriesService.getList(queryFn).subscribe(res => {
        this.list = res;
      });
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

  add() {
    this.selectedCategory = <any>null;
  }

  create(category: Category) {
    this.categoriesService.create(category).subscribe(_ => {

    })
  }
}
