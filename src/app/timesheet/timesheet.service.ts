import { Injectable } from "@angular/core";
import { TimesheetCellComponent } from "./timesheet-cell/timesheet-cell.component";

@Injectable()
export class TimesheetService {

    cellsInfo: TimesheetCellComponent[] = [];

    public addCellInfo(element: TimesheetCellComponent) {
        this.cellsInfo.push(element);
    }

    public getRightCellForBoundingClientRect(domRect: DOMRect, row: string): TimesheetCellComponent {
        return this.getCellForPosition(domRect.right - 2, row);
    }

    public getLeftCellForBoundingClientRect(domRect: DOMRect, row: string): TimesheetCellComponent {
        return this.getCellForPosition(domRect.left + 2, row);
    }

    public getNbCellBetween(firstCell: TimesheetCellComponent, lastCell: TimesheetCellComponent) {
        return this.cellsInfo.indexOf(lastCell) - this.cellsInfo.indexOf(firstCell);
    }

    public getCellAtPosition(lastCell: TimesheetCellComponent, overcellSize: number) {
        const basePosition = this.cellsInfo.indexOf(lastCell);
        return this.cellsInfo[basePosition - overcellSize];
    }

    private getCellForPosition(positionX: number, row: string) {
        return this.cellsInfo
            .filter(cellInfo => cellInfo.row == row)
            .find(cellInfo => {
                const cellBouding = cellInfo.element.nativeElement.getBoundingClientRect();
                return cellBouding.left <= positionX && cellBouding.right >= positionX;
            })!;
    }
}