import { Item } from './item.model';

export type FindAll = {
  readonly count: number;
  readonly items: Item[];
};
