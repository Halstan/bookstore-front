import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'securedom'
})
export class SecuredomPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
