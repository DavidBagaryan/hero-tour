import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Array<Hero>;
  constructor(
    private heroService: HeroService,
    private router: Router
  ) {}
  ngOnInit(): void { this.getHeroes() }
  getHeroes(): void { this.heroService.getHeroes().then(heroes => this.heroes = heroes) }
  onSelect(hero: Hero): void { this.selectedHero = hero }
  goToDetail(): void { this.router.navigate(['/detail', this.selectedHero.id]) }
  add(name: string): void {
    name = name.trim();
    if (!name) { return }
    this.heroService.create(name, this.heroes)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
    });
  }
    remove(hero: Hero): void {
      this.heroService
        .remove(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          this.selectedHero = this.selectedHero === hero ? null : this.selectedHero;
      });
    }
}
