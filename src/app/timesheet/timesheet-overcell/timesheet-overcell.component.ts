import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone, reflectComponentType } from '@angular/core';
import { auditTime, merge, of, Subject, tap, withLatestFrom } from 'rxjs';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-overcell',
  templateUrl: './timesheet-overcell.component.html',
  styleUrls: ['./timesheet-overcell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetOverCellComponent {

  private isLeft: boolean = false;
  private initialLeft : number = 0;

  private startSize$ = new Subject<DOMRect>();
  private dragMove$ = new Subject<CdkDragMove>();
  private dragMoveAudited$ = this.dragMove$.pipe(
    withLatestFrom(this.startSize$),
    auditTime(10),
    tap(([{ distance }, rect]) => {
      if (this.isLeft) {
        const newLeft = `${this.initialLeft + distance.x}px`;
        this.el.nativeElement.style.left = newLeft;
        this.el.nativeElement.style.width = `${rect.width - distance.x}px`;
      } else {
        this.el.nativeElement.style.width = `${rect.width + distance.x}px`;
      }
    })
  );

  constructor(private el: ElementRef<HTMLElement>, private timeSheetService: TimesheetService) {
    this.dragMoveAudited$.subscribe();
  }

  dragStarted(isLeft: boolean): void {
    this.isLeft = isLeft;

    let myLeft = "0";
    if (this.el.nativeElement.style.left.length > 0) {
      myLeft = this.el.nativeElement.style.left.substring(0, this.el.nativeElement.style.left.length - 2);
    }

    this.initialLeft = parseInt(myLeft);

      console.log('drag started');
    this.startSize$.next(this.el.nativeElement.getBoundingClientRect());
  }

  dragEnded($event: CdkDragEnd): void {
    console.log('drag ended');
    $event.source._dragRef.reset();

    const elementBound = this.el.nativeElement.getBoundingClientRect();

    // managed right bound
    const cellRight = this.timeSheetService.getRightCellForBoundingClientRect(elementBound);
    const newWidth = cellRight.nativeElement.getBoundingClientRect().right -
      this.el.nativeElement.getBoundingClientRect().left;

    // managed left bound
    const cellLeft = this.timeSheetService.getLeftCellForBoundingClientRect(elementBound);

    const leftDist = cellLeft.nativeElement.getBoundingClientRect().left - elementBound.left;

    let myLeft = "0";
    if (this.el.nativeElement.style.left.length > 0) {
      myLeft = this.el.nativeElement.style.left.substring(0, this.el.nativeElement.style.left.length - 2);
    }

    const newLeft = parseInt(myLeft) + leftDist
    this.el.nativeElement.style.left = newLeft + "px";

    this.el.nativeElement.style.width = `${newWidth + Math.abs(leftDist)}px`;


  }

  dragMoved($event: CdkDragMove): void {
    console.log('drag moved');
    this.dragMove$.next($event);
  }

}
