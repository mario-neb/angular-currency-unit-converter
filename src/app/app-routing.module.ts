import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { LengthConverterComponent } from './components/length-converter/length-converter.component';

const routes: Routes = [
  { path: 'currency-converter', component: CurrencyConverterComponent },
  { path: 'length-converter', component: LengthConverterComponent },
  { path: '', redirectTo: '/currency-converter', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
