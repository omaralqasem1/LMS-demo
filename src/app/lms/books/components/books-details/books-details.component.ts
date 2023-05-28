import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent implements OnInit {
  form: FormGroup;

  constructor(formBuilder: FormBuilder, private booksService: BooksService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = formBuilder.group({
      name: [],
      categoryId: [],
      author: [],
    });
    const book = activatedRoute.snapshot.data['book'];
    this.form.patchValue(book);
  }

  ngOnInit(): void {
  }

  save() {
    this.booksService.create(this.form.value).subscribe(_ => {
      this.router.navigate(['..'], {
        relativeTo: this.activatedRoute
      });
    });
  }

}
