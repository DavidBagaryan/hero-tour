import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {isUndefined} from 'util';
import 'rxjs/add/operator/switchMap';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  private editMode = false;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => {
        this.hero = hero;
        if (isUndefined(hero.power) || hero.power === '') { this.hero.power = undefined }
      });
  }
  power() { this.editMode = true }
  goBack(): void { this.location.back() }
  update(mode: string): void {
    if (mode === 'save') { this.heroService.update(this.hero).then(hero => {
      this.editMode = false;
      this.hero.power = this.hero.power === '' ? undefined : hero.power;
    })}
    if (mode === 'cancel') {
      this.editMode = false;
      this.heroService.getHero(this.hero.id)
        .then(hero => { this.hero.power = hero.power === '' ? undefined : hero.power });
    }
  }
}
