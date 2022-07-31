import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timesheet-row',
  templateUrl: './timesheet-row.component.html',
  styleUrls: ['./timesheet-row.component.less']
})
export class TimesheetRowComponent {

    @Input()
    rowInfo? : { name: string, data : {name: string}[]};

}
