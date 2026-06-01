import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a> <a routerLink="/posts">Posts</a></nav>
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('AngularExo');
}
