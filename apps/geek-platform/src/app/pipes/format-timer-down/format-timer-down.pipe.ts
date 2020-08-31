import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimerDown',
})
export class FormatTimerDownPipe implements PipeTransform {
  transform(value: number, args?: any): string {
    const valueToSeconds = value / 1000;
    const hours = Math.floor(valueToSeconds / 3600);
    const minutes = Math.floor((valueToSeconds - hours * 3600) / 60);
    const seconds = Math.floor((valueToSeconds - hours * 3600 - minutes * 60));

    return hours > 0
      ? `${hours} h : ${minutes} m : ${seconds} s`
      : `${value < 0 ? 0 : minutes} m : ${value < 0 ? 0 : seconds} s`;
  }
}
