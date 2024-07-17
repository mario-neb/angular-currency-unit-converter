import { Injectable } from '@angular/core';
import axios from 'axios';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
 
  //Currency
  async getExchangeRates(base: string) {
    const response = await axios.get(
      `${config.API_URL}?api_key=${config.CURRENCY_API_KEY}&base=${base}`
    );
    return response.data.exchange_rates;
  }

  //Length
  private conversionRates: { [key: string]: number } = {
    meter: 1,
    yard: 0.9144,
    inch: 0.0254,
  };

  getConversionRate(unit: string): number {
    return this.conversionRates[unit] || 0;
  }

  convert(value: number, fromUnit: string, toUnit: string): number {
    const fromRate = this.getConversionRate(fromUnit);
    const toRate = this.getConversionRate(toUnit);
    return (value * fromRate) / toRate;
  }
}
