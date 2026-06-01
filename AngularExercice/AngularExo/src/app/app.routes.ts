import { Routes } from '@angular/router';
import { Books } from './components/books/books';
import { NotFound } from './components/not-found/not-found';
import { Posts } from './components/posts/posts';

export const routes: Routes = [
  {
    path: 'books',
    component: Books,
    title: 'Books'
  },
  {
    path: 'posts',
    component: Posts,
    title: 'Posts'
  },
  {
    path: 'posts/:id',
    component: Posts,
    title: 'Post details'
  },
  {
    path: '**',
    component: NotFound,
    title: 'Not found'
  }
];
