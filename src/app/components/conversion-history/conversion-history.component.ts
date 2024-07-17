import { Component, Input } from '@angular/core';
import { FinalizedConversion } from 'src/app/models/currency-conversion-history';

@Component({
  selector: 'app-conversion-history',
  templateUrl: './conversion-history.component.html',
  styleUrls: ['./conversion-history.component.scss']
})
export class ConversionHistoryComponent {
  @Input() conversionHistory: FinalizedConversion[] = [];
}
