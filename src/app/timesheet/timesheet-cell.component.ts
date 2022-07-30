import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timesheet-cell',
  templateUrl: './timesheet-cell.component.html',
  styleUrls: ['./timesheet-cell.component.less']
})
export class TimesheetCellComponent {

    @Input()
    cellInfo? : { name: string};

}
