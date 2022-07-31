import { Component } from '@angular/core';
import { TimesheetService } from './timesheet.service';

@Component({
    selector: 'app-timesheet',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.component.less'],
    providers: [TimesheetService]
})
export class TimesheetComponent {

    weeks = [{ name: "w1" }, { name: "w2" }, { name: "w3" }, { name: "w4" }, { name: "w5" }];
    
    rows: { name: string, data: { name: string }[] }[] = [
        { name: "A", data: this.weeks },
        { name: "B", data: this.weeks },
        { name: "C", data: this.weeks }];
}
