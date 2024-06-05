import { inject, Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { selectCharacters } from './characters.selectors';

// selectors
const selectArena = createFeatureSelector<string[]>('arena');
const selectArenaCharacters = createSelector(selectArena, selectCharacters, (arena, characters) =>
  characters.filter((c) => arena.includes(c.id)),
);
const selectFighter1 = createSelector(selectArenaCharacters, (characters) => characters[0]);
const selectFighter2 = createSelector(selectArenaCharacters, (characters) => characters[1]);

@Injectable({
  providedIn: 'root',
})
export class ArenaSelector {
  #store = inject(Store);

  public arena$ = this.#store.select(selectArenaCharacters);
  public fighter1$ = this.#store.select(selectFighter1);
  public fighter2$ = this.#store.select(selectFighter2);
}
