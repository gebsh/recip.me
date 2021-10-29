import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopRipplePropagation]',
})
export class StopRipplePropagationDirective {
  @HostListener('mousedown', ['$event'])
  public stopMousedownPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('touchstart', ['$event'])
  public stopTouchstartPropagation(event: TouchEvent): void {
    event.stopPropagation();
  }
}
