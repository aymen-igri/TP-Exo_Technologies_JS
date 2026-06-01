import { Component } from '@angular/core';
import { Book } from '../../types/Book';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.component.html',
})
export class Books {
  Books: Book[] = [
    { id: 1, title: 'Book 1', author: 'Author 1', publishedDate: 2020 },
    { id: 2, title: 'Book 2', author: 'Author 2', publishedDate: 2021 },
    { id: 3, title: 'Book 3', author: 'Author 3', publishedDate: 2021 },
  ];
}