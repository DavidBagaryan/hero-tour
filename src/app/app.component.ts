import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a class="d-inline nav-link" *ngFor="let link of links" [routerLink]="'/'+link">{{link}}</a>
    </nav>
    <br/>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
  links: Array<string> = [
    'dashboard',
    'heroes'
  ];
}
