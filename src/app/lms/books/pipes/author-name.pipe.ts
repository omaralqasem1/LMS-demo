import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthorsService } from '../services/authors.service';

@Pipe({
  name: 'authorName'
})
export class AuthorNamePipe implements PipeTransform {
  constructor(private authorsService: AuthorsService) { }

  transform(authorId: string): Observable<string> {
    return this.authorsService.get(authorId).pipe(
      map(author => author?.name || 'N/A')
    );
  }

}
