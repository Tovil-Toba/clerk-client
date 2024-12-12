import { Pipe, PipeTransform } from '@angular/core';

import { Name } from '../../api/models/name';
import { transformUserNameLong } from './transform-user-name-long';

@Pipe({
  name: 'userNameLong',
  standalone: true,
})
export class UserNameLongPipe implements PipeTransform {
  transform(name: Name): string {
    return transformUserNameLong(name);
  }
}
