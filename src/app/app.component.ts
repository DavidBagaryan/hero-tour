import {Component} from '@angular/core';

interface Link {
  name: string
  url: string
}

@Component({
  selector: 'app-root',
  template: `
      <h1>{{title}}</h1>
      <nav>
          <a class="d-inline nav-link" *ngFor="let link of links" [routerLink]="'/'+link.url">{{link.name}}</a>
      </nav>
      <br/>
      <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'тур героическай';
  links: Array<Link> = [
      { name: 'доска почета', url: 'dashboard' },
      { name: 'все герои', url: 'heroes' }
  ];
}
