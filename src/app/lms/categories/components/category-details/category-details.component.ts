import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models.ts/category.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

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
  }

  form: FormGroup;
  category: Category;
  @Output() update: EventEmitter<Category>;
  @Output() create: EventEmitter<Category>;

  constructor(formBuilder: FormBuilder, private categoriesService: CategoriesService) {
    this.category = new Category('');
    this.form = formBuilder.group({
      name: ['', Validators.required],
    });
    this.update = new EventEmitter();
    this.create = new EventEmitter();
  }

  ngOnInit(): void {
  }

  save() {
    const category: Category = {
      ...this.category,
      ...this.form.value
    }
    this.categoriesService.getList(q => {
      return q.where('name', '==', category.name);
    }).subscribe(res => {
      if (res.length) {
        this.form.controls['name'].setErrors({ duplicatedName: true });
        return;
      }
      if (this.category.id)
        this.update.emit(category);
      else
        this.create.emit(category)
      this.form.reset();
    });
  }
}
