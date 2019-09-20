export interface WithPagination<TData> {
  items: TData[];
  cursor: Cursor;
}

export interface WithPaginationVars {
  offset: number;
  limit: number;
}

export interface Cursor {
  total: number;
  perPage: number;
  currentPage: number;
  hasPages: boolean;
}

export type SortField = 'asc' | 'desc';
