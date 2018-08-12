import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {AddBookDialogComponent} from './add-book-dialog/add-book-dialog.component';
import {Book} from '../../shared/book.model';
import {tap} from 'rxjs/internal/operators';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books: Array<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['position', 'name', 'author', 'date'];
  newBook: Book = {position: 1, name: '', author: '', publishDate: new Date()};
  dataSource = new MatTableDataSource([]);

  pagination = {
    length: 2,
    pageSize: 2,
    pageIndex: 0,
    pageSizeOptions: [2, 4, 6, 8],
  };

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.pagination.length = this.books.length;
    this.updateTableData();
  }

  ngAfterViewInit() {
    this.paginator.page
      .subscribe((page) => {
        this.pagination.pageSize = page.pageSize;
        this.pagination.pageIndex = page.pageIndex;
        this.updateTableData();
        console.log('page changed', page);
      });
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
      this.updateTableData();
    });
  }

  updateTableData() {
    let startIndex = this.pagination.pageIndex * this.pagination.pageSize;
    let endIndex = startIndex + this.pagination.pageSize;
    let booksPage = this.books.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource(booksPage);
  }
}
