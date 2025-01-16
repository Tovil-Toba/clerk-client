export type Column = {
  readonly field: string;
  readonly header: string;
  readonly filterType: 'date' | 'numeric' | 'text';
};
