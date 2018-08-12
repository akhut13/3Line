import { Component, OnInit } from '@angular/core';
import {Book} from '../shared/book.model';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  books: Book[] = [
    {position: 1, name: 'Hydrogen', author: 'kukukulii', publishDate: new Date()},
    {position: 2, name: 'Hydrogen', author: 'kukukulii', publishDate: new Date()},
    {position: 3, name: 'Hydrogen', author: 'kukukulii', publishDate: new Date()},
    {position: 4, name: 'Hydrogen', author: 'kukukulii', publishDate: new Date()},
    {position: 5, name: 'Hydrogen', author: 'kukukulii', publishDate: new Date()},
  ];
  constructor() { }

  ngOnInit() {
  }

}
