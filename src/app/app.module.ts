import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatNativeDateModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {AppComponent} from './app.component';
import {BooksComponent} from './books/books.component';
import {BookListComponent} from './books/book-list/book-list.component';
import {BookComponent} from './books/book-list/book/book.component';
import {AddBookDialogComponent} from './books/book-list/add-book-dialog/add-book-dialog.component';
import {BooksService} from './services/books.service';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookListComponent,
    BookComponent,
    AddBookDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    BooksService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddBookDialogComponent]
})
export class AppModule {
}
