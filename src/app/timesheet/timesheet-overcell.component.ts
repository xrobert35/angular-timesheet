import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone } from '@angular/core';
import { auditTime, merge, of, Subject, tap, withLatestFrom } from 'rxjs';

@Component({
    selector: 'app-timesheet-overcell',
    templateUrl: './timesheet-overcell.component.html',
    styleUrls: ['./timesheet-overcell.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetOverCellComponent {

    private startSize$ = new Subject<DOMRect>();
    private dragMove$ = new Subject<CdkDragMove>();
    private dragMoveAudited$ = this.dragMove$.pipe(
      withLatestFrom(this.startSize$),
      auditTime(10),
      tap(([{ distance }, rect]) => {
        console.log('resize');
        this.el.nativeElement.style.width = `${rect.width + distance.x}px`;
      })
    );
  
    //sub$ = merge(this.dragMoveAudited$, of(true));
  
    constructor(private el: ElementRef<HTMLElement>) {
        this.dragMoveAudited$.subscribe();
    }
  
    dragStarted(): void {
      console.log('drag started');
      this.startSize$.next(this.el.nativeElement.getBoundingClientRect());
    }
  
    dragEnded($event: CdkDragEnd): void {
      console.log('drag ended');
      $event.source._dragRef.reset();
      //this.resized.emit(this.el.nativeElement.getBoundingClientRect());
    }
  
    dragMoved($event: CdkDragMove): void {
      console.log('drag moved');
      this.dragMove$.next($event);
    }

}
