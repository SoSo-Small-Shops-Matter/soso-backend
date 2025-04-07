export class PagingDto {
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
  nextPage: boolean;

  constructor(page: number, limit: number, totalElements: number, totalPages: number, nextPage: boolean) {
    this.page = page;
    this.limit = limit;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.nextPage = nextPage;
  }
}

export class ResponsePageNationDTO<T> {
  data: T[];
  pageInfo: PagingDto;

  constructor(data: T[], pageInfo: PagingDto) {
    this.data = data;
    this.pageInfo = pageInfo;
  }
}
