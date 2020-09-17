import { Component, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  countries: Country[] = [];
  constructor(private _countryService: CountryService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  private getCountries() {
    this._countryService.getCountries().subscribe(
      (res) => {
        this.countries = res;
      },
      (err) => console.error('Erro ao tentar carregar países')
    );
  }
}
