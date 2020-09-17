import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countriesUrl = '/all';
  private filteredFildsUrl =
    '/all?fields=name;capital;region;subregion;population;area;timezones;nativeName;flag';

}
