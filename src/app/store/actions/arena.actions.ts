import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CharacterDTO } from '../../shared/models/characters.dto';

export const arenaActions = createActionGroup({
  source: 'Arena',
  events: {
    'add character': props<{ character: CharacterDTO }>(),
    'remove character': props<{ character: CharacterDTO }>(),
    clean: emptyProps(),
  },
});
