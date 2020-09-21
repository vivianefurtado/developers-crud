import { DevelopersDto } from "./developers.dto";

export class PaginatedDevelopersResultDto {
  content: DevelopersDto[];
  totalCount: number;
}