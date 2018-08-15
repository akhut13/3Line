import { Component, OnInit } from '@angular/core';
import {Book} from '../shared/book.model';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  books: Book[] = [
    {id: 1, name: 'komsemariga', author: 'kukukulii', publishDate: new Date()},
    {id: 2, name: 'fefe', author: 'kukukulii', publishDate: new Date()},
    {id: 3, name: 'aloha', author: 'kukukulii', publishDate: new Date()},
    {id: 4, name: 'bura', author: 'kukukulii', publishDate: new Date()},
    {id: 5, name: 'jora', author: 'kukukulii', publishDate: new Date()},
    {id: 6, name: 'komseige', author: 'kukukulii', publishDate: new Date()},
    {id: 7, name: 'opanaa', author: 'kukukulii', publishDate: new Date()},
    {id: 8, name: 'pipu', author: 'kukukulii', publishDate: new Date()},
    {id: 9, name: 'oma', author: 'kukukulii', publishDate: new Date()},
    {id: 10, name: 'apa', author: 'kukukulii', publishDate: new Date()},
    {id: 11, name: 'egi', author: 'kukukulii', publishDate: new Date()},
  ];
  constructor() { }

  ngOnInit() {
  }

}
