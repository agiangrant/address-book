export enum ContactSortDirection {
  ASC = 1,
  DESC = -1,
}

export interface ContactFilter {
  sortDirection?: ContactSortDirection;
  sortField?: string;
  searchTerm?: string;
}
