import { Component, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { CountryService } from '../services/country.service';
import { Workbook } from 'exceljs';
import * as XMLWriter from 'xml-writer';
import * as fs from 'file-saver';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries = [];
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

  public exportExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Dados de países');

    worksheet.columns = [
      { header: 'Nome', key: 'name', width: 32 },
      { header: 'Nome Nativo', key: 'nativeName', width: 32 },
      { header: 'Capital', key: 'capital', width: 32 },
      { header: 'Região', key: 'region', width: 32 },
      { header: 'Sub Região', key: 'subregion', width: 32 },
      { header: 'População', key: 'population', width: 32 },
      { header: 'Área', key: 'area', width: 32 },
      { header: 'Link para ver bandeira', key: 'flag', width: 40 },
      { header: 'Fuso Horário', key: 'timezones', width: 50 },
    ];

    worksheet.addRows(this.countries, 'n');

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'Paises.xlsx');
    });
  }

  public exportCSV() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Dados de países');

    worksheet.columns = [
      { header: 'Nome', key: 'name', width: 32 },
      { header: 'Nome Nativo', key: 'nativeName', width: 32 },
      { header: 'Capital', key: 'capital', width: 32 },
      { header: 'Região', key: 'region', width: 32 },
      { header: 'Sub Região', key: 'subregion', width: 32 },
      { header: 'População', key: 'population', width: 32 },
      { header: 'Área', key: 'area', width: 32 },
      { header: 'Link para ver bandeira', key: 'flag', width: 40 },
      {
        header: 'Fuso Horário',
        key: 'timezones',
        width: 50,
        style: { font: { name: 'Arial Black', size: 10 } },
      },
    ];

    worksheet.addRows(this.countries, 'n');

    workbook.csv.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'text/csv' });
      fs.saveAs(blob, 'paises.csv');
    });
  }

  public exportXML() {
    let xw = new XMLWriter();

    xw.startDocument();
    xw.startElement('root');
    xw.startElement('paises');
    this.countries.forEach((data) => {
      xw.startElement('pais')
        .writeAttribute('nomeNativo', data.nativeName)
        // .writeAttribute('capital', data.capital)
        // .writeAttribute('regiao', data.region)
        // .writeAttribute('subRegiao', data.subregion)
        // .writeAttribute('populacao', data.population)
        // .writeAttribute('area', data.area)
        // .writeAttribute('fusoHorario', data.timezones)
        // .writeAttribute('Bandeira', data.flag)
        .text(data.name)
        .endElement();
    });
    xw.endDocument();

    let blob = new Blob([xw], { type: 'text/xml' });
    fs.saveAs(blob, 'paises.xml');
  }
}
