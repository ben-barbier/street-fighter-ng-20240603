import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharactersService } from '../../shared/services/characters.service';
import { charactersActions } from '../actions/characters.actions';

@Injectable()
export class CharactersEffects {
  private actions$ = inject(Actions);
  private charactersService = inject(CharactersService);

  getCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(charactersActions.getAll),
      switchMap(() =>
        this.charactersService.getCharacters().pipe(
          map((characters) => charactersActions.getAllSuccess({ characters })),
          catchError((error) => of(charactersActions.getAllError({ error }))),
        ),
      ),
    );
  });

  deleteCharacter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(charactersActions.deleteOne),
      switchMap(({ character }) =>
        this.charactersService.deleteCharacter(character).pipe(
          map(() => charactersActions.deleteOneSuccess({ character })),
          catchError((error) => of(charactersActions.deleteOneError({ error }))),
        ),
      ),
    );
  });
}
