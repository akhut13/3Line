import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AddBookDialogComponent} from './add-book-dialog/add-book-dialog.component';
import {Book} from '../../shared/book.model';
import {tap} from 'rxjs/internal/operators';
import {BooksService} from '../../services/books.service';


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
  newBook: Book = {id: 1, name: '', author: '', publishDate: new Date().getTime()};
  dataSource = new MatTableDataSource([]);
  selectAll = false;
  tableData = [];
  selectedBooks = [];

  pagination = {
    length: 5,
    pageSize: 5,
    pageIndex: 0,
    pageSizeOptions: [5, 10, 20],
  };

  constructor(public dialog: MatDialog, private bookService: BooksService) {
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
      });
  }

  onRowClicked(row) {
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
      if (result) {
        result.id = this.books[this.books.length - 1].id + 1;
        result.publishDate = new Date(result.publishDate).getTime();
        this.books.push(JSON.parse(JSON.stringify(result)));
        this.updateTableData();
        this.newBook = {id: 1, name: '', author: '', publishDate: new Date().getTime()};
      }
    });
  }

  editBook(book){
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
      data: Object.assign({}, book)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.books.forEach(book => {
          if (book.id === result.id) {
            book.name = result.name;
            book.author = result.author;
            book.publishDate = new Date(result.publishDate).getTime();
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
      let deleteIds = this.tableData.filter(item => item.selected).map(book => book.id);
      deleteIds.forEach((id) => this.deleteBookById(id));
      this.selectAll = false;
    } else {
      this.deleteBookById(id);
    }
    this.updateTableData();
  }

  selectAllChange() {
    this.setCheckBox(this.tableData, this.selectAll);
  }

  private setCheckBox(data, value = false) {
    data.forEach(item => {
      item['selected'] = value;
    });
  }

  updateTableData() {
    this.bookService.setBooks(this.books);
    let startIndex = this.pagination.pageIndex * this.pagination.pageSize;
    let endIndex = startIndex + this.pagination.pageSize;
    this.tableData = JSON.parse(JSON.stringify(this.books.slice(startIndex, endIndex)));
    this.setCheckBox(this.tableData, this.selectAll);
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }

  getBookPublishDate(date) {
    let bookDate = new Date(date);
    return bookDate.getDate() + '-' + bookDate.getMonth() + '-' + bookDate.getFullYear();
  }
}
