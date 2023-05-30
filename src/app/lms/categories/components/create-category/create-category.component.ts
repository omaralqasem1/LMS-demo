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

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    private categoriesService: CategoriesService
  ) {
    this.nameCtrl = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
  }

  create(): void {
    const category = new Category(this.nameCtrl.value);
    this.categoriesService.create(category).subscribe(_ => {
      this.dialogRef.close(category);
    });
  }
}
