import { Name } from '../../api/models/name';

export type Item = {
  readonly createdAt: string;
  readonly id: number;
  readonly isActive?: boolean;
  readonly name?: string | Name;
  readonly updatedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [key: string]: any;
};
