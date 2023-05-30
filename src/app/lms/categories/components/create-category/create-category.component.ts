import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models.ts/category.class';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  nameCtrl: FormControl;
  inProgress: boolean;
  hasError: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    private categoriesService: CategoriesService
  ) {
    this.nameCtrl = new FormControl('', Validators.required);
    this.inProgress = false;
    this.hasError = false;
  }

  ngOnInit(): void {
  }

  create(): void {
    if (this.nameCtrl.invalid || this.inProgress) return;
    this.hasError = false;
    this.inProgress = true;
    const category = new Category(this.nameCtrl.value);
    this.categoriesService.create(category).subscribe(
      {
        next: _ => {
          this.inProgress = false;
          this.dialogRef.close(category);
        },
        error: _ => {
          this.hasError = true;
          this.inProgress = false;
        }
      }
    );
  }
}
