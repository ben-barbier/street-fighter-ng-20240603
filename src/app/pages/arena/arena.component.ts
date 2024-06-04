import { AsyncPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { map } from 'rxjs/operators';
import { ArenaService } from '../../shared/store/arena.service';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss',
})
export default class ArenaComponent {
  #arenaService = inject(ArenaService);

  fighter1$ = this.#arenaService.arena$.pipe(map((a) => a[0]));
  fighter2$ = this.#arenaService.arena$.pipe(map((a) => a[1]));

  count = signal(0);
  double = computed(() => this.count() * 2);
  logDouble = effect(() => console.log(this.double()));

  increment() {
    this.count.update((v) => v + 1);
  }
}
