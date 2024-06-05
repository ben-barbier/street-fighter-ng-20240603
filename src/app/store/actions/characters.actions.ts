import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CharacterDTO } from '../../shared/models/characters.dto';

export const charactersActions = createActionGroup({
  source: 'Characters',
  events: {
    'get all': emptyProps(),
    'get all success': props<{ characters: CharacterDTO[] }>(),
    'get all error': props<{ error: string }>(),

    'get one': props<{ id: string }>(),
    'get one success': props<{ character: CharacterDTO }>(),
    'get one error': props<{ error: string }>(),

    'update one': props<{ character: CharacterDTO }>(),
    'update one success': props<{ character: CharacterDTO }>(),
    'update one error': props<{ error: string }>(),

    'delete one': props<{ character: CharacterDTO }>(),
    'delete one success': props<{ character: CharacterDTO }>(),
    'delete one error': props<{ error: string }>(),
  },
});
