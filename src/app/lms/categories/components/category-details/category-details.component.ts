import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Observable, map } from 'rxjs';
import { BooksService } from 'src/app/lms/books/services/books.service';
import { where } from 'firebase/firestore';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  @Input('category') set Category(value: Category) {
    this.category = value || new Category('');
    this.form.reset();
    this.form.patchValue(this.category);
    if (!value) return;
    this.booksCount$ = this.booksService.getCount(where('categoryId', '==', this.category.id)).pipe(
      map(count => count.toString())
    );
  }

  form: FormGroup;
  category: Category;
  booksCount$!: Observable<string>;
  inProgress: boolean;
  @Output() update: EventEmitter<Category>;

  constructor(formBuilder: FormBuilder, private categoriesService: CategoriesService, private booksService: BooksService) {
    this.category = new Category('');
    this.form = formBuilder.group({
      name: ['', Validators.required],
    });
    this.update = new EventEmitter();
    this.inProgress = false;
  }

  ngOnInit(): void { }

  save(closeBtn: HTMLButtonElement) {
    if (this.form.invalid || this.inProgress) return;
    const category: Category = {
      ...this.category,
      ...this.form.value
    }
    this.inProgress = true;
    this.categoriesService.getList(q => {
      return q.where('name', '==', category.name);
    }).subscribe(
      {
        next: res => {
          if (res.length) {
            this.form.controls['name'].setErrors({ duplicatedName: true });
            this.form.markAllAsTouched();
            return;
          }
          this.update.emit(category);
          this.form.reset();
          closeBtn.click();
          this.inProgress = false;
        },
        error: _ => {
          this.inProgress = false;
        }
      }
    );
  }
}
