import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TimesheetComponent } from './timesheet.component';
import { TimesheetRowComponent } from './timesheet-row/timesheet-row.component';
import { TimesheetCellComponent } from './timesheet-cell/timesheet-cell.component';
import { TimesheetOverCellComponent } from './timesheet-overcell/timesheet-overcell.component';
import { TimesheetData, TimesheetDataDef } from './timesheet.data.component';
import { CommonModule } from '@angular/common';

export * from './timesheet.component';
export * from './timesheet.data.component';

const sharedComponents = [TimesheetComponent,
    TimesheetData,
    TimesheetDataDef];

@NgModule({
    declarations: [
        TimesheetRowComponent,
        TimesheetCellComponent,
        TimesheetOverCellComponent,
        ...sharedComponents
    ],
    imports: [
        CommonModule,
        DragDropModule
    ],
    exports: [...sharedComponents],
})
export class TimesheetModule { }
