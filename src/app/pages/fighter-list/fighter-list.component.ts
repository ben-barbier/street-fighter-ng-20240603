import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Character, CharactersService } from '../../shared/services/characters.service';
import { FighterCardComponent } from './fighter-card/fighter-card.component';

@Component({
  selector: 'app-fighter-list',
  standalone: true,
  imports: [JsonPipe, FighterCardComponent],
  templateUrl: './fighter-list.component.html',
  styleUrl: './fighter-list.component.scss',
})
export default class FighterListComponent implements OnInit {
  characters: Character[] = [];
  #charactersService = inject(CharactersService);

  ngOnInit(): void {
    this.#charactersService
      .getCharactersWithCountries2()
      .pipe(takeUntilDestroyed())
      .subscribe((characters) => {
        this.characters = characters;
      });
  }
}
