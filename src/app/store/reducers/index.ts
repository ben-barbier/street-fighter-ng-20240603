import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { CharacterDTO } from '../../shared/models/characters.dto';
import { arenaReducer } from './arena.reducer';
import { charactersReducer } from './characters.reducer';

export interface EntityState {
  characters: CharacterDTO[];
  arena: string[]; // Identifiants des characters
}

export const reducers: ActionReducerMap<EntityState> = {
  characters: charactersReducer,
  arena: arenaReducer,
};

const localStorageSyncReducer = (reducer: ActionReducer<EntityState>): ActionReducer<EntityState> => {
  return localStorageSync({ keys: ['characters'], rehydrate: true })(reducer);
};

export const metaReducers: MetaReducer<EntityState, Action>[] = [localStorageSyncReducer];
