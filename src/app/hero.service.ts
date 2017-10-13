import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Hero} from './hero';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});
  static handleError(error: any): Promise<any> {
    console.log('произошла ошибка', error);
    return Promise.reject(error.message || error);
  }
  static checkHeroId(heroes: Array<Hero>): number {
    return heroes.length > 0 ? heroes[ heroes.length - 1 ].id + 1 : 0;
  }
  constructor(
    private http: Http,
  ) {}
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json() as Array<Hero>)
      .catch(HeroService.handleError);
  }
  getHero(id: number): Promise<Hero> {
    let url = `${this.heroesUrl}/${id}`;
    // cash trick
    url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'r=' + Math.random();
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(HeroService.handleError);
  }
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(HeroService.handleError);
  }
  create(name: string, heroes: Array<Hero>): Promise<Hero> {
    if (heroes.find(hero => hero.name === name )) {
      return Promise.reject('такое имя есть ' + name );
    } else {
      return this.http
        .post(this.heroesUrl, JSON.stringify({
            id: HeroService.checkHeroId(heroes),
            name: name,
        }), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Hero)
        .catch(HeroService.handleError);
    }
  }
  remove(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => console.log(id))
      .catch(HeroService.handleError)
  }
}
