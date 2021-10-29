import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopRipplePropagationDirective } from './stop-ripple-propagation.directive';

@NgModule({
  declarations: [StopRipplePropagationDirective],
  imports: [CommonModule],
  exports: [StopRipplePropagationDirective],
})
export class SharedModule {}
