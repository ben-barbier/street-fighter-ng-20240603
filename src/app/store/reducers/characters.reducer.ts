import { createReducer, on } from '@ngrx/store';
import { CharacterDTO } from '../../shared/models/characters.dto';
import { charactersActions } from '../actions/characters.actions';

const initialState: CharacterDTO[] = [];

export const charactersReducer = createReducer(
  initialState,
  on(charactersActions.getAllSuccess, (state, { characters }) => characters),
  on(charactersActions.updateOneSuccess, (state, { character }) =>
    state.map((c) => (c.id === character.id ? character : c)),
  ),
  on(charactersActions.deleteOneSuccess, (state, { character }) => state.filter((c) => c.id !== character.id)),
  on(charactersActions.getOneSuccess, (state, { character }) => {
    const unicornIsPresent = state.some((c) => c.id === character.id);
    if (unicornIsPresent) {
      return state.map((u) => (u.id === character.id ? character : u));
    } else {
      return state.concat(character);
    }
  }),
);
