import { Component, OnInit } from '@angular/core';
import {Book} from '../shared/book.model';
import {BooksService} from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getVersion().subscribe(versions => {
      this.booksService.getBooks().subscribe(response => {
        this.books = response;
      })
    })

  }



}
