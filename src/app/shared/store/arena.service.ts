import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterWithCountry } from '../services/characters.service';

@Injectable({ providedIn: 'root' })
export class ArenaService {
  #arena$ = new BehaviorSubject<CharacterWithCountry[]>([]);

  arena$ = this.#arena$.asObservable();

  addFighter(fighter: CharacterWithCountry): void {
    const arena = this.#arena$.getValue();
    if (!arena[0]) {
      const newArena = [fighter, arena[1]];
      this.#arena$.next(newArena);
    } else if (!arena[1]) {
      const newArena = [arena[0], fighter];
      this.#arena$.next(newArena);
    }
  }
}
