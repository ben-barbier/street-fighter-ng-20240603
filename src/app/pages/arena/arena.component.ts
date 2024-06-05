import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArenaDispatchers } from '../../store/dispatchers/arena.dispatchers';
import { ArenaSelector } from '../../store/selectors/arena.selectors';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArenaComponent {
  #selectors = inject(ArenaSelector);
  #dispatchers = inject(ArenaDispatchers);

  fighter1$ = this.#selectors.fighter1$;
  fighter2$ = this.#selectors.fighter2$;

  clearArena() {
    this.#dispatchers.clean();
  }
}
