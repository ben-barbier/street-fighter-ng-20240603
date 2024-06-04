import { JsonPipe, NgForOf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CharacterWithCountry, CharactersService } from '../../shared/services/characters.service';
import { FighterCardComponent } from './fighter-card/fighter-card.component';

@Component({
  selector: 'app-fighter-list',
  standalone: true,
  imports: [JsonPipe, FighterCardComponent, NgForOf],
  templateUrl: './fighter-list.component.html',
  styleUrl: './fighter-list.component.scss',
})
export default class FighterListComponent implements OnInit {
  characters: CharacterWithCountry[] = [];
  #charactersService = inject(CharactersService);

  ngOnInit(): void {
    this.#charactersService.getCharactersWithCountries2().subscribe((characters) => {
      this.characters = characters;
    });
  }
}
