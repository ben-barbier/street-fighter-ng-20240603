import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatAll, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterDTO } from '../models/characters.dto';
import { CountryDTO } from '../models/country.dto';

interface CharacterWithCountry extends CharacterDTO {
  countryDTO: CountryDTO;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private _http: HttpClient) {}

  // Retourne les characters avec leurs noms en majuscule
  getCharacters(): Observable<CharacterDTO[]> {
    return this._http.get<CharacterDTO[]>('http://localhost:3000/characters').pipe(
      concatAll(),
      map((character) => ({ ...character, name: character.name.toUpperCase() })),
      toArray(),
    );
  }

  getCharactersWithCountries(): Observable<CharacterWithCountry[]> {
    //...
    // this.getCharacters()...
    // TODO !!!
    // /countries/:id
  }
}
