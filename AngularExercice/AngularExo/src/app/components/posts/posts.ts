import { Component, inject, signal } from '@angular/core';
import { Post } from '../../types/Post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styles: ``,
})
export class Posts {
  Posts: Post[] = [
    { id: '1', title: 'Post 1', content: 'Content of post 1' },
    { id: '2', title: 'Post 2', content: 'Content of post 2' },
    { id: '3', title: 'Post 3', content: 'Content of post 3' },
  ];

  CurrentPost: Post[] = [];

  productID = signal('');

  private activatedRoute = inject(ActivatedRoute);

  constructor(private router: Router) {

    this.activatedRoute.params.subscribe((params) => {
      this.productID.set(params['id']);
      console.log(this.productID())
    });
    
    if (this.productID() !== "" && this.productID() !== undefined) {
      this.CurrentPost = this.Posts.filter(post => post.id === this.productID());
      console.log("currentPost details", this.CurrentPost)
    } else {
      // if (router.url === '/posts' && (this.productID() === "" || this.productID() === undefined) ) {
        
      //   
      // } else {
      //   router.navigate(['/**']);
      // }
      this.CurrentPost = this.Posts;
      console.log("currentPost", this.CurrentPost)
    }
  }
  
}
