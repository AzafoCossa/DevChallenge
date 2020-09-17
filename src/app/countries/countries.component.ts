import { Component, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { CountryService } from '../services/country.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
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
