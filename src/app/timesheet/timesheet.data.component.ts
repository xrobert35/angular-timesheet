import { Component, Directive, TemplateRef } from "@angular/core";

@Component({
    selector: 'app-timesheet-data',
    template: '<ng-content></ng-content>',
})
export class TimesheetData {
}

@Directive({
    selector: '[appTimesheetData]',
})
export class TimesheetDataDef {
    constructor(public template: TemplateRef<any>) {
    }
}
