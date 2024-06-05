import { Injectable, signal } from '@angular/core';
import { CharacterDTO } from '../models/characters.dto';

@Injectable({ providedIn: 'root' })
export class ArenaService {
  // #arena$ = new BehaviorSubject<CharacterWithCountry[]>([]);
  //
  // arena$ = this.#arena$.asObservable();
  //
  // addFighter_old(fighter: CharacterWithCountry): void {
  //   const arena = this.#arena$.getValue();
  //   if (!arena[0]) {
  //     const newArena = [fighter, arena[1]];
  //     this.#arena$.next(newArena);
  //   } else if (!arena[1]) {
  //     const newArena = [arena[0], fighter];
  //     this.#arena$.next(newArena);
  //   }
  // }

  // V2
  #arena = signal<CharacterDTO[]>([]);

  arena = this.#arena.asReadonly();

  addFighter(fighter: CharacterDTO): void {
    this.#arena.update((currentArena) => {
      if (!currentArena[0]) {
        return [fighter, currentArena[1]];
      } else if (!currentArena[1]) {
        return [currentArena[0], fighter];
      }
      return currentArena;
    });
  }
}
