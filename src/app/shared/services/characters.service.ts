import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatAll, forkJoin, mergeMap, Observable, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterDTO } from '../models/characters.dto';
import { CountryDTO } from '../models/country.dto';
import { CountriesService } from './countries.service';

export interface CharacterWithCountry extends CharacterDTO {
  countryDTO: CountryDTO;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  #http = inject(HttpClient);
  #countriesService = inject(CountriesService);

  // Retourne les characters avec leurs noms en majuscule
  getCharacters(): Observable<CharacterDTO[]> {
    return this.#http.get<CharacterDTO[]>('http://localhost:3000/characters').pipe(
      concatAll(),
      map((character) => ({ ...character, name: character.name.toUpperCase() })),
      toArray(),
    );
  }

  getCharactersWithCountries(): Observable<CharacterWithCountry[]> {
    return this.getCharacters().pipe(
      concatAll(),
      mergeMap((character) =>
        this.#countriesService
          .getCountryByName(character.country)
          .pipe(map((country): CharacterWithCountry => ({ ...character, countryDTO: country }))),
      ),
      toArray(),
    );
  }

  getCharactersWithCountries2(): Observable<CharacterWithCountry[]> {
    return forkJoin([this.getCharacters(), this.#countriesService.getAll()]).pipe(
      map(([characters, countries]) => {
        return characters.map((character): CharacterWithCountry => {
          return { ...character, countryDTO: countries.find((c) => c.name === character.country)! };
        });
      }),
    );
  }
}
