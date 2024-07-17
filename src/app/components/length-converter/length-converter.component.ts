import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FinalizedConversion } from 'src/app/models/currency-conversion-history';
import { Length } from 'src/app/models/enums';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['./length-converter.component.scss']
})
export class LengthConverterComponent {
  units = Object.values(Length);
  fromUnit = Length.Meter;
  toUnit = Length.Yard;
  amount = 1;
  result: number | null = null;
  lengthForm: FormGroup;

  //Here we can easily add conversion history
  constructor(private fb: FormBuilder, private converterService: ConverterService) {
    this.lengthForm = this.fb.group({
      fromUnit: ['meter', Validators.required],
      amount: [1, [Validators.required, Validators.min(0)]],
      toUnit: ['yard', Validators.required]
    });
  }


  convert() {
    if (this.lengthForm.valid) {
      const { fromUnit, amount, toUnit } = this.lengthForm.value;
      this.result = this.converterService.convert(amount, fromUnit, toUnit);
    }
  }

  clearResult() {
    this.result = 0;
  }
}
