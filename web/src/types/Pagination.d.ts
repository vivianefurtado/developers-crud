export type PageRequest = {
  page: number;
  size: number;
}

export type PaginationData = {
  content: DevelopersDto[];
  totalCount: number;
  totalPages: number;
}