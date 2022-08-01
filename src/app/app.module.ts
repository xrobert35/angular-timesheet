import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimesheetModule } from './timesheet/timesheet.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TimesheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
