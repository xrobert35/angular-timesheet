import { Component, Input } from '@angular/core';
import { TimesheetDataDef } from '../timesheet.data.component';

@Component({
  selector: 'app-timesheet-row',
  templateUrl: './timesheet-row.component.html',
  styleUrls: ['./timesheet-row.component.less']
})
export class TimesheetRowComponent {

    @Input()
    timesheetData? : TimesheetDataDef;

    @Input()
    rowInfo? : { name: string, data : {name: string}[]};

}
