import { Pipe, PipeTransform } from '@angular/core';

import { Name } from '../../api/models/name';
import { transformUserNameShort } from './transform-user-name-short';

@Pipe({
  name: 'userNameShort',
  standalone: true,
})
export class UserNameShortPipe implements PipeTransform {
  transform(name: Name): string {
    return transformUserNameShort(name);
  }
}
