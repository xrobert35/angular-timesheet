import { Component } from '@angular/core';

@Component({
    selector: 'app-timesheet',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.component.less']
})
export class TimesheetComponent {

    weeks = [{name : "w1"}, {name : "w2"}, {name : "w3"}, {name : "w4"}, {name : "w5"}];
    rows : { name: string, weeks : {name: string}[]}[] = [
        { name: "A", weeks : this.weeks }, 
        { name: "B", weeks : this.weeks },
        { name: "C", weeks : this.weeks }];

}
