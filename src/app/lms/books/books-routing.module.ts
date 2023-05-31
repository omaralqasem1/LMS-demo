import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { BookDetailsResolver } from './resolvers/book-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: BooksListComponent
  },
  {
    path: ':id',
    component: BooksDetailsComponent,
    resolve: {
      book: BookDetailsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
