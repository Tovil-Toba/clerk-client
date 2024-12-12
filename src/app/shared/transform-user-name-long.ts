import { Name } from '../../api/models/name';

export const transformUserNameLong = (name: Name): string => {
  let nameLong = `${name.last} ${name.first}`;

  if (name.middle) {
    nameLong += ` ${name.middle}`;
  }

  return nameLong;
};
