import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryDTO } from '../models/country.dto';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  #http = inject(HttpClient);

  getAll(): Observable<CountryDTO[]> {
    return this.#http.get<CountryDTO[]>(`http://localhost:3000/countries`);
  }

  getCountryByName(countryName: string): Observable<CountryDTO> {
    return this.#http.get<CountryDTO>(`http://localhost:3000/countries/${countryName}`);
  }
}
