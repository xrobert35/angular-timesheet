import { Component, ContentChild } from '@angular/core';
import { TimesheetDataDef } from './timesheet.data.component';
import { TimesheetService } from './timesheet.service';

@Component({
    selector: 'app-timesheet',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.component.less'],
    providers: [TimesheetService]
})
export class TimesheetComponent {

    @ContentChild(TimesheetDataDef)
    timesheetData? : TimesheetDataDef
    
    weeks = [{ name: "w1" }, { name: "w2" }, { name: "w3" }, { name: "w4" }, 
    { name: "w5" }, { name: "w6" } , { name: "w7" } , { name: "w8" }];

    rows: { name: string, data: { name: string }[] }[] = [
        { name: "A", data: this.weeks },
        { name: "B", data: this.weeks },
        { name: "C", data: this.weeks },
        { name: "D", data: this.weeks }];
}
