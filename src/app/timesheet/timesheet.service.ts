import { ElementRef, Injectable } from "@angular/core";

@Injectable()
export class TimesheetService {

    cellRefs : ElementRef<HTMLElement>[] = [];

    public addCellRef(element: ElementRef<HTMLElement>){
        this.cellRefs.push(element);
    }

    public getRightCellForBoundingClientRect(domRect : DOMRect): ElementRef<HTMLElement>{
        return this.cellRefs.find(cellRef => {
            const cellBouding = cellRef.nativeElement.getBoundingClientRect();
            const overCellRight = domRect.right;
            return cellBouding.left <= overCellRight && cellBouding.right >= overCellRight;
        })!;
    }

    public getLeftCellForBoundingClientRect(domRect : DOMRect): ElementRef<HTMLElement>{
        return this.cellRefs.find(cellRef => {
            const cellBouding = cellRef.nativeElement.getBoundingClientRect();
            const overCellLeft = domRect.left;
            return cellBouding.left <= overCellLeft && cellBouding.right >= overCellLeft;
        })!;
    }
}