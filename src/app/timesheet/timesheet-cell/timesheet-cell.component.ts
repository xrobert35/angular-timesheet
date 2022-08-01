import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-cell',
  templateUrl: './timesheet-cell.component.html',
  styleUrls: ['./timesheet-cell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetCellComponent {

    @Input()
    cellInfo? : { name: string};

    @Input()
    row: string = "";

    constructor(public element: ElementRef<HTMLElement>, 
      private timeSheetService: TimesheetService){
    }

    ngOnInit(){
      this.timeSheetService.addCellInfo(this);
    }

}
