import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CharacterDTO } from '../../shared/models/characters.dto';
import { charactersActions } from '../actions/characters.actions';

@Injectable({ providedIn: 'root' })
export class CharactersDispatchers {
  #store = inject(Store);

  public getAll(): void {
    this.#store.dispatch(charactersActions.getAll());
  }

  public get(id: string): void {
    this.#store.dispatch(charactersActions.getOne({ id }));
  }

  public deleteCharacter(character: CharacterDTO): void {
    this.#store.dispatch(charactersActions.deleteOne({ character }));
  }

  public updateCharacter(character: CharacterDTO): void {
    this.#store.dispatch(charactersActions.updateOne({ character }));
  }
}
