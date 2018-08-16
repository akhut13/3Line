import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../shared/book.model';
import {Observable, of} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

const baseURL = 'https://api.jsonbin.io/b/5b75db7a7b2129536791ac13/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'secret-key': '$2a$10$DQ7RkfaCpyWgrGXMKNPRQugmFrlcHWabzLKc3pBWYyQPMzUryEBCK'
  })
};

@Injectable()
export class BooksService {

  version = '';

  constructor(private http: HttpClient) {
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.version =  error.error.versionCount
      return of(result as T);
    };
  }

  getVersion(): Observable<any> {
    return this.http.get("https://api.jsonbin.io/e/5b75db7a7b2129536791ac13/versions", httpOptions).pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(baseURL + this.version, httpOptions);
  }

  setBooks(books) {
    books = JSON.stringify(books);
    return this.http.put(baseURL, books, httpOptions).subscribe(response => {
      this.version = response['version'];
    });
  }

}
