import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CharacterDTO } from '../../shared/models/characters.dto';
import { arenaActions } from '../actions/arena.actions';

@Injectable({ providedIn: 'root' })
export class ArenaDispatchers {
  #store = inject(Store);

  public addCharacter(character: CharacterDTO): void {
    this.#store.dispatch(arenaActions.addCharacter({ character }));
  }

  public removeCharacter(character: CharacterDTO): void {
    this.#store.dispatch(arenaActions.removeCharacter({ character }));
  }

  public clean(): void {
    this.#store.dispatch(arenaActions.clean());
  }
}
