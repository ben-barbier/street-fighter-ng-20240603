import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { CharacterDTO } from '../../shared/models/characters.dto';
import { Character } from '../../shared/services/characters.service';
import { CountriesService } from '../../shared/services/countries.service';
import { ArenaService } from '../../shared/store/arena.service';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './arena.component.html',
  styleUrl: './arena.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArenaComponent {
  #arenaService = inject(ArenaService);
  #countryService = inject(CountriesService);

  fighter1 = computed((): CharacterDTO | undefined => this.#arenaService.arena()[0]);
  fighter2 = computed((): CharacterDTO | undefined => this.#arenaService.arena()[1]);

  // score = SUM DES STAMINA
  score = computed(() => {
    const arena = this.#arenaService.arena();
    return (arena[0]?.stamina ?? 0) + (arena[1]?.stamina ?? 0);
  });

  // Afficher les pays des characters suite à un appel d'API sur /country/:name
  fighter1Country = toSignal(
    toObservable(this.fighter1).pipe(
      filter((f1): f1 is Character => !!f1),
      switchMap((f1: Character) => this.#countryService.getCountryByName(f1.country)),
    ),
  );

  // e = effect(() => {
  //   this.#countryService.getCountryByName(this.fighter1().country).subscribe((c) => {
  //     this.fighter1Country = c;
  //   });
  // });

  // Au départ => fighter1.country (France)
  // A l'arrivée => L'objet Country de la France (avec le flag)
}
