import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
  pure: true,
})
export class PreparationTimePipe implements PipeTransform {
  public transform(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    if (hours > 0) {
      return minutes > 0 ? `${hours} h ${minutes} min` : `${hours} h`;
    } else {
      return `${minutes} min`;
    }
  }
}
