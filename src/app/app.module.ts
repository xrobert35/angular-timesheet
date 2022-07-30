import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { TimesheetCellComponent } from './timesheet/timesheet-cell.component';
import { TimesheetOverCellComponent } from './timesheet/timesheet-overcell.component';
import { TimesheetRowComponent } from './timesheet/timesheet-row.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    TimesheetRowComponent,
    TimesheetCellComponent,
    TimesheetOverCellComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
