import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { CategoryNamePipe } from './pipes/category-name.pipe';
import { AuthorNamePipe } from './pipes/author-name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BooksListComponent,
    BooksDetailsComponent,
    CategoryNamePipe,
    AuthorNamePipe
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedModule
  ]
})
export class BooksModule { }
