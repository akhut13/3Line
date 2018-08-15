import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
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
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['checkbox', 'id', 'name', 'author', 'date', 'delete', 'edit'];
  newBook: Book = {id: 1, name: '', author: '', publishDate: new Date()};
  dataSource = new MatTableDataSource([]);
  selectAll = false;
  booksPage = [];
  selectedBooks = [];

  pagination = {
    length: 5,
    pageSize: 5,
    pageIndex: 0,
    pageSizeOptions: [5, 10, 20],
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
      if (result) {
        result.position = this.books[this.books.length - 1].id + 1;
        this.books.push(result);
        this.updateTableData();
      }
    });
  }

  editBook(book){
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
      data: Object.assign({}, book)
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.books.forEach(book => {
          if (book.id === result.id) {
            book.name = result.name;
            book.author = result.author;
          }
        });
        this.updateTableData();
      }
    });
  }

  private deleteBookById(id) {
    this.books.forEach((book, index) => {
      if (book.id === id) {
        this.books.splice(index, 1);
      }
    });
  }

  deleteBook(id=null) {
    if (!id) {
      let deleteIds = this.booksPage.filter(item => item.selected).map(book => book.id);
      deleteIds.forEach((id) => this.deleteBookById(id));
      this.selectAll = false;
    } else {
      this.deleteBookById(id);
    }
    this.updateTableData();
  }

  selectAllChange() {
    this.setCheckBox(this.booksPage, this.selectAll);
  }

  private setCheckBox(data, value = false) {
    data.forEach(item => {
      item['selected'] = value;
    });
  }

  updateTableData() {
    let startIndex = this.pagination.pageIndex * this.pagination.pageSize;
    let endIndex = startIndex + this.pagination.pageSize;
    this.booksPage = this.books.slice(startIndex, endIndex);
    this.setCheckBox(this.booksPage, this.selectAll);
    this.dataSource = new MatTableDataSource(this.booksPage);
    this.dataSource.sort = this.sort;
  }
}
