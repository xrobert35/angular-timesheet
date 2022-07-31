import { Component, ElementRef, Input } from '@angular/core';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-cell',
  templateUrl: './timesheet-cell.component.html',
  styleUrls: ['./timesheet-cell.component.less']
})
export class TimesheetCellComponent {

    @Input()
    cellInfo? : { name: string};

    constructor(private element: ElementRef<HTMLElement>, private timeSheetService: TimesheetService){
      this.timeSheetService.addCellRef(element);
    }

}
