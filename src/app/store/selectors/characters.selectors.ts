import { inject, Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { CharacterDTO } from '../../shared/models/characters.dto';

// selectors
export const selectCharacters = createFeatureSelector<CharacterDTO[]>('characters');
const selectCharacter = (id: string) =>
  createSelector(selectCharacters, (state: CharacterDTO[]) => state.find((c) => c.id === id));
const selectCountries = createSelector(selectCharacters, (characters) => characters.map((c) => c.country));

@Injectable({
  providedIn: 'root',
})
export class CharactersSelector {
  #store = inject(Store);

  public characters$ = this.#store.select(selectCharacters);
  public character$ = (id: string) => this.#store.select(selectCharacter(id));
  public charactersCountries$ = this.#store.select(selectCountries);
}
