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
import { Character } from '../../../shared/services/characters.service';
import { ArenaService } from '../../../shared/store/arena.service';

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
  // @Input({ required: true }) fighter!: CharacterWithCountry;
  fighter = input.required<Character>();
  pictureUrl = computed(() => `http://localhost:4200/assets/characters/${this.fighter().id}_thumbnail.png`);

  #arenaService = inject(ArenaService);

  addFighterToArena() {
    this.#arenaService.addFighter(this.fighter());
  }
}
