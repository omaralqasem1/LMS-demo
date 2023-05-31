import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../../models/book.interface';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent implements OnInit {
  form: FormGroup;
  book: IBook;

  constructor(formBuilder: FormBuilder, activatedRoute: ActivatedRoute) {
    this.form = formBuilder.group({
      name: [],
      categoryId: [],
      author: [],
    });
    this.book = activatedRoute.snapshot.data['book'];

  }

  ngOnInit(): void {
  }

  // save() {
  //   this.booksService.create(this.form.value).subscribe(_ => {
  //     this.router.navigate(['..'], {
  //       relativeTo: this.activatedRoute
  //     });
  //   });
  // }

}
