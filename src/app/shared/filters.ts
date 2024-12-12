import { DateFilterEnum } from '../../api/models/date-filter-enum';
import { NumberFilterEnum } from '../../api/models/number-filter-enum';
import { StringFilterEnum } from '../../api/models/string-filter-enum';

export const FILTERS: Record<
  string,
  DateFilterEnum | NumberFilterEnum | StringFilterEnum
> = {
  contains: StringFilterEnum.Contains,
  dateAfter: DateFilterEnum.MoreThan,
  dateBefore: DateFilterEnum.LessThan,
  dateIs: DateFilterEnum.Equals,
  dateIsNot: DateFilterEnum.NotEquals,
  endsWith: StringFilterEnum.EndsWith,
  equals: StringFilterEnum.Equals,
  gt: NumberFilterEnum.MoreThan,
  gte: NumberFilterEnum.MoreThanOrEqual,
  lt: NumberFilterEnum.LessThan,
  lte: NumberFilterEnum.LessThanOrEqual,
  notContains: StringFilterEnum.NotContains,
  notEquals: StringFilterEnum.NotEquals,
  startsWith: StringFilterEnum.StartsWith,
};
