import { Name } from '../../api/models/name';

export const transformUserNameShort = (name: Name): string => {
  let nameShort = `${name.last} ${name.first.charAt(0)}.`;

  if (name.middle) {
    nameShort += ` ${name.middle.charAt(0)}.`;
  }

  return nameShort;
};
