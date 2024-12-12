import { Name } from '../../api/models/name';
import { transformUserNameLong } from './transform-user-name-long';

export const getItemName = (name: string | Name) => {
  if (typeof name === 'string') {
    return name;
  }

  return transformUserNameLong(name);
};
