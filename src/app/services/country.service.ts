import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countriesUrl = '/all';
  private filteredFildsUrl =
    '/all?fields=name;capital;region;subregion;population;area;timezones;nativeName;flag';

  constructor(private _http: HttpClient) {}

  getCountries() {
    return this._http.get<Country[]>(this.filteredFildsUrl);
  }
}
