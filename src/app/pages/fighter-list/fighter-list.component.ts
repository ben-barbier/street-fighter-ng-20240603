import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CharactersDispatchers } from '../../store/dispatchers/characters.dispatchers';
import { CharactersSelector } from '../../store/selectors/characters.selectors';
import { FighterCardComponent } from './fighter-card/fighter-card.component';

@Component({
  selector: 'app-fighter-list',
  standalone: true,
  imports: [FighterCardComponent, AsyncPipe],
  templateUrl: './fighter-list.component.html',
  styleUrl: './fighter-list.component.scss',
})
export default class FighterListComponent implements OnInit {
  #selectors = inject(CharactersSelector);
  #dispatchers = inject(CharactersDispatchers);

  characters$ = this.#selectors.characters$;

  ngOnInit(): void {
    this.#dispatchers.getAll();
  }
}
