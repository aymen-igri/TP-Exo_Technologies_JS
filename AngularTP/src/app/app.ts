import { Component, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `
    <h1>Hello, {{ title() }}</h1>

    <router-outlet />
  `,
  styles: [],
})
export class App implements OnInit {
  protected readonly title = signal("AngularTP");

  ngOnInit(): void {
    console.log("hello from the app of the project");
  }
}
