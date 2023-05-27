import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories/services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CategoriesService]
})
export class HomeComponent implements OnInit {
  categoriesCount$: Observable<number>;
  constructor(private categoriesService: CategoriesService) {
    this.categoriesCount$ = this.categoriesService.getCount();
  }

  ngOnInit(): void {
  }

}
