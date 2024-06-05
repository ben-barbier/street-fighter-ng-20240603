import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatAll, forkJoin, mergeMap, Observable, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterDTO } from '../models/characters.dto';
import { CountryDTO } from '../models/country.dto';
import { CountriesService } from './countries.service';

export interface Character extends CharacterDTO {
  countryDTO: CountryDTO;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  #http = inject(HttpClient);
  #countriesService = inject(CountriesService);

  deleteCharacter(character: CharacterDTO): Observable<void> {
    return this.#http.delete<void>(`http://localhost:3000/characters/${character.id}`);
  }

  // Retourne les characters avec leurs noms en majuscule
  getCharacters(): Observable<CharacterDTO[]> {
    return this.#http.get<CharacterDTO[]>('http://localhost:3000/characters').pipe(
      concatAll(),
      map((character) => ({ ...character, name: character.name.toUpperCase() })),
      toArray(),
    );
  }

  getCharactersWithCountries(): Observable<Character[]> {
    return this.getCharacters().pipe(
      concatAll(),
      mergeMap((character) =>
        this.#countriesService
          .getCountryByName(character.country)
          .pipe(map((country): Character => ({ ...character, countryDTO: country }))),
      ),
      toArray(),
    );
  }

  getCharactersWithCountries2(): Observable<Character[]> {
    return forkJoin([this.getCharacters(), this.#countriesService.getAll()]).pipe(
      map(([characters, countries]) => {
        return characters.map((character): Character => {
          return { ...character, countryDTO: countries.find((c) => c.name === character.country)! };
        });
      }),
    );
  }
}
