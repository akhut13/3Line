import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AddBookDialogComponent} from './add-book-dialog/add-book-dialog.component';
import {Book} from '../../shared/book.model';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {



  @Input() books: Array<Book>;
  displayedColumns = ['position', 'name', 'author', 'date'];
  newBook: Book = {position: 1, name: '', author: '', publishDate: new Date()};
  dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.books);
  }


  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addBookClicked() {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
      data: this.newBook
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      result.position = this.books[this.books.length - 1].position + 1;
      this.books.push(result);
      this.dataSource = new MatTableDataSource(this.books);
    });
  }
}
