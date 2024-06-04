import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CharacterDTO } from '../../shared/models/characters.dto';
import { CharactersService } from '../../shared/services/characters.service';

@Component({
  selector: 'app-fighter-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './fighter-list.component.html',
  styleUrl: './fighter-list.component.scss',
})
export default class FighterListComponent implements OnInit {
  characters: CharacterDTO[] = [];
  #charactersService = inject(CharactersService);

  ngOnInit(): void {
    this.#charactersService.getCharacters().subscribe((characters) => {
      this.characters = characters;
    });
  }
}
