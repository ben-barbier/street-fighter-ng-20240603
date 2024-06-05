import { Component, computed, inject, input } from '@angular/core';
import { MatMiniFabAnchor, MatMiniFabButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CharacterDTO } from '../../../shared/models/characters.dto';
import { ArenaService } from '../../../shared/store/arena.service';
import { CharactersDispatchers } from '../../../store/dispatchers/characters.dispatchers';

@Component({
  selector: 'app-fighter-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardAvatar,
    MatIcon,
    RouterLink,
    MatMiniFabButton,
    MatMiniFabAnchor,
  ],
  templateUrl: './fighter-card.component.html',
  styleUrl: './fighter-card.component.scss',
})
export class FighterCardComponent {
  fighter = input.required<CharacterDTO>();
  pictureUrl = computed(() => `http://localhost:4200/assets/characters/${this.fighter().id}_thumbnail.png`);

  #arenaService = inject(ArenaService);
  #dispatchers = inject(CharactersDispatchers);

  addFighterToArena() {
    this.#arenaService.addFighter(this.fighter());
  }

  deleteFighter() {
    this.#dispatchers.deleteCharacter(this.fighter());
  }
}
