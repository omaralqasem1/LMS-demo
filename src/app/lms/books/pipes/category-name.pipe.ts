import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesService } from '../../categories/services/categories.service';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {

  constructor(private categoriesService: CategoriesService) { }

  transform(categoryId: string): Observable<string> {
    return this.categoriesService.get(categoryId).pipe(
      map(category => category?.name || 'N/A')
    );
  }

}
