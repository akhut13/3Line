import { Component, OnInit } from '@angular/core';
import {Book} from '../shared/book.model';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  books: Book[] = [
    {position: 1, name: 'komsemariga', author: 'kukukulii', publishDate: new Date()},
    {position: 2, name: 'fefe', author: 'kukukulii', publishDate: new Date()},
    {position: 3, name: 'aloha', author: 'kukukulii', publishDate: new Date()},
    {position: 4, name: 'bura', author: 'kukukulii', publishDate: new Date()},
    {position: 5, name: 'jora', author: 'kukukulii', publishDate: new Date()},
    {position: 5, name: 'komseige', author: 'kukukulii', publishDate: new Date()},
    {position: 5, name: 'opanaa', author: 'kukukulii', publishDate: new Date()},
    {position: 5, name: 'pipu', author: 'kukukulii', publishDate: new Date()},
    {position: 5, name: 'oma', author: 'kukukulii', publishDate: new Date()},
    {position: 5, name: 'apa', author: 'kukukulii', publishDate: new Date()},
    {position: 5, name: 'egi', author: 'kukukulii', publishDate: new Date()},
  ];
  constructor() { }

  ngOnInit() {
  }

}
