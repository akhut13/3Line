import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Book} from '../../../shared/book.model';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})
export class AddBookDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book) {
    console.log('received data', data)
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    console.log(this.data);
    this.dialogRef.close(this.data);
  }


}
