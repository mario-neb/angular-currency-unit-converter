import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { LengthConverterComponent } from './components/length-converter/length-converter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversionHistoryComponent } from './components/conversion-history/conversion-history.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    LengthConverterComponent,
    ConversionHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    //PWA
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 50 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:50000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
