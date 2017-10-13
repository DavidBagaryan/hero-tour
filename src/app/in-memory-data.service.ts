import {InMemoryDbService} from 'angular-in-memory-web-api';

import {Hero} from './hero';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): Object {
    const heroes: Array<Hero> = [
      {id: 0,  name: 'Нулевик'},
      {id: 11, name: 'Ашот'},
      {id: 12, name: 'Агоп', power: 'шаурма'},
      {id: 13, name: 'Нурбий', power: 'сварочно-хуярочные работы'},
      {id: 14, name: 'Сосик', power: 'адуши певец'},
      {id: 15, name: 'Вано'},
      {id: 16, name: 'Тигран', power: 'лезгинка'},
      {id: 17, name: 'Гурам', power: 'чахохбили'},
      {id: 18, name: 'Меназ'},
      {id: 19, name: 'Вазген', power: 'жигули кайф имеет'},
      {id: 20, name: 'Ваче', power: 'хоровацдз'}
    ];
    return {heroes};
  }
}
