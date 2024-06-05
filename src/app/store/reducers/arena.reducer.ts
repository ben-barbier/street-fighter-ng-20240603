import { createReducer, on } from '@ngrx/store';
import { arenaActions } from '../actions/arena.actions';
import { charactersActions } from '../actions/characters.actions';

const initialState: string[] = [];

export const arenaReducer = createReducer(
  initialState,
  on(arenaActions.clean, () => []),
  on(arenaActions.addCharacter, (state, { character }) => {
    if (!state[0]) {
      return [character.id, state[1]];
    } else if (!state[1]) {
      return [state[0], character.id];
    }
    return state;
  }),
  on(arenaActions.removeCharacter, (state, { character }) => {
    return state.filter((c) => c !== character.id);
  }),
  on(charactersActions.deleteOneSuccess, (state, { character }) => {
    return state.filter((c) => c !== character.id);
  }),
);
