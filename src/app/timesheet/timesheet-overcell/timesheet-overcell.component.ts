import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { auditTime, filter, Subject, tap, withLatestFrom } from 'rxjs';
import { TimesheetCellComponent } from '../timesheet-cell/timesheet-cell.component';
import { TimesheetDataDef } from '../timesheet.data.component';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-overcell',
  templateUrl: './timesheet-overcell.component.html',
  styleUrls: ['./timesheet-overcell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetOverCellComponent implements AfterViewInit {

  @Input()
  row: string = "";

  @Input()
  timesheetData? : TimesheetDataDef;

  firstCell?: TimesheetCellComponent;
  lastCell?: TimesheetCellComponent;

  resizing: boolean = false;
  dragged : boolean = false;

  private startSize$ = new Subject<{ domRec: DOMRect, isLeft: boolean, initialLeft: number }>();
  private dragMove$ = new Subject<CdkDragMove>();
  private dragMoveAudited$ = this.dragMove$.pipe(
    withLatestFrom(this.startSize$),
    auditTime(10),
    filter((_) => this.resizing),
    tap(([{ distance }, initialData]) => {
      if (initialData.isLeft) {
        const newLeft = `${initialData.initialLeft + distance.x}px`;
        this.el.nativeElement.style.left = newLeft;
        this.el.nativeElement.style.width = `${initialData.domRec.width - distance.x}px`;
      } else {
        this.el.nativeElement.style.width = `${initialData.domRec.width + distance.x}px`;
      }
    })
  );

  constructor(private el: ElementRef<HTMLElement>, 
    private timeSheetService: TimesheetService, 
    private cds : ChangeDetectorRef) {
    this.dragMoveAudited$.subscribe();
  }

  ngAfterViewInit() {
    this.initBound();
    this.cds.detectChanges();
    const observer = new ResizeObserver((_) => {
      this.updateViewFromModel();
    });
    observer.observe(document.querySelector("app-timesheet-row")!);
  }

  dragStarted(isLeft: boolean): void {
    console.log('drag started');
    this.resizing = true; 
    

    this.startSize$.next({
      domRec: this.el.nativeElement.getBoundingClientRect(),
      isLeft: isLeft,
      initialLeft: this.getLeftStyleValue(this.el.nativeElement)
    });
  }

  dragEnded($event: CdkDragEnd): void {
    console.log('drag ended');
    this.resizing = false;

    $event.source._dragRef.reset();

    this.initBound();

    console.log("left bound " + this.firstCell!.row + " - " + this.firstCell!.cellInfo?.name);
    console.log("right bound " + this.lastCell!.row + " - " + this.lastCell!.cellInfo?.name);
  }

  private initBound() {
    const elementBound = this.el.nativeElement.getBoundingClientRect();
    this.firstCell = this.timeSheetService.getLeftCellForBoundingClientRect(elementBound, this.row);
    this.lastCell = this.timeSheetService.getRightCellForBoundingClientRect(elementBound, this.row);

    this.updateViewFromModel();
  }

  dragMoved($event: CdkDragMove): void {
    console.log('drag moved');
    this.dragMove$.next($event);
  }

  private updateViewFromModel() {
    const elementBound = this.el.nativeElement.getBoundingClientRect();

    // managed right bound (to move the right border we simply play with the width)
    const newWidth = this.lastCell!.element.nativeElement.getBoundingClientRect().right -
      this.el.nativeElement.getBoundingClientRect().left;

    // managed left bound
    // to move the left, we use the "leftStyle" and we also manage the width to keep the right size at the correct position
    const leftDist = this.firstCell!.element.nativeElement.getBoundingClientRect().left - elementBound.left;
    const leftStyle = this.getLeftStyleValue(this.el.nativeElement);
    const newLeft = leftStyle + leftDist

    this.el.nativeElement.style.left = newLeft + "px";
    this.el.nativeElement.style.width = `${newWidth - leftDist}px`;
    //this.el.nativeElement.style.maxWidth = `${newWidth - leftDist}px`;
  }

  overCellDragStarted(){
    this.dragged = true;
  }

  /**
   * We move the overcell based on his right side
   * We get the first and last cell and update the view based on the new model information
   * @param $event 
   */
  overCellDragEnded() {
    this.dragged = false;
    const elementBound = this.el.nativeElement.getBoundingClientRect();

    const overcellSize = this.timeSheetService.getNbCellBetween(this.firstCell!, this.lastCell!);

    this.lastCell = this.timeSheetService.getRightCellForBoundingClientRect(elementBound, this.row);
    this.firstCell = this.timeSheetService.getCellAtPosition(this.lastCell, overcellSize);
    this.updateViewFromModel();
  }

  private getLeftStyleValue(element: HTMLElement): number {
    let myLeft = "0";
    if (element.style.left.length > 0) {
      myLeft = element.style.left.substring(0, element.style.left.length - 2);
    }
    return parseInt(myLeft);
  }

}
