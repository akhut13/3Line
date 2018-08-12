import { Component, OnInit } from '@angular/core';
import {Book} from '../shared/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [
    new Book('kuku1', 'lala', new Date()),
    new Book('kuku2', 'lala', new Date()),
    new Book('kuku3', 'lala', new Date())
  ];

  constructor() { }

  ngOnInit() {
  }

}
