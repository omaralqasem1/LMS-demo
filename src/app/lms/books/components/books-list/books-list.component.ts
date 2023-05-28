import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBook } from '../../models/book.interface';
import { BooksService } from '../../services/books.service';
import { PageEvent } from '@angular/material/paginator';
import { QueryFn } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  displayedColumns: string[];
  count: number;
  pageIndex: number;
  pageSize: number;
  getListSubscription!: Subscription;
  list: IBook[];

  constructor(private booksService: BooksService) {
    this.displayedColumns = ['name', 'category', 'author'];
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
    this.booksService.getCount().subscribe(count => {
      this.count = count;
    });
  }

  get(queryFn?: QueryFn) {
    if (this.getListSubscription)
      this.getListSubscription.unsubscribe();
    this.getListSubscription =
      this.booksService.getList(queryFn).subscribe(res => {
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


}