import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConverterService } from '../../services/converter.service';
import { FinalizedConversion } from '../../models/currency-conversion-history';
import { Currency } from 'src/app/models/enums';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  currencies = Object.values(Currency);
  conversionForm: FormGroup;
  result: number | null = null;
  rates: any = {};
  conversionHistory: FinalizedConversion[] = [];

  constructor(
    private fb: FormBuilder,
    private currencyService: ConverterService
  ) {
    this.conversionForm = this.fb.group({
      fromUnit: Currency.USD,
      amount: [1],
      toUnit: Currency.EUR,
    });
  }

  ngOnInit() {
    this.getRates(this.conversionForm.value.fromUnit);
  }

  // triggered when original currency changes
  async getRates(base: string) {
    this.rates = await this.currencyService.getExchangeRates(base);
  }

  async convert() {
    const { fromUnit, amount, toUnit } = this.conversionForm.value;
    await this.getRates(fromUnit);
    if (this.rates[toUnit]) {
      this.result = amount * this.rates[toUnit];
      this.addToConversionHistory(amount, fromUnit, toUnit, this.result);
    }
  }

  addToConversionHistory(
    amount: number,
    originalType: string,
    desiredType: string,
    convertedValue: number
  ) {
    const newRecord: FinalizedConversion = {
      amount,
      originalType,
      desiredType,
      convertedValue,
    };
    this.conversionHistory.push(newRecord);
  }

  clearResult() {
    this.result = 0;
  }

  compareActualwithLatestConversion() {
    if (this.conversionHistory.length === 0) {
      //empty history
      return false;
    }
   
    const lastEntry = this.conversionHistory[this.conversionHistory.length - 1];
    const currentValues = this.conversionForm.value;

    return (
      lastEntry.amount === currentValues.amount &&
      lastEntry.originalType === currentValues.fromUnit &&
      lastEntry.desiredType === currentValues.toUnit
    );
  }
}
