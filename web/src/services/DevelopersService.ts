import { DevelopersDto, PageRequest, PaginationData } from "../types";

import axios, {AxiosPromise} from "axios";

export const findById = (id: string): AxiosPromise<DevelopersDto> =>
  axios.get(`/developers/${id}`);
  
export const findAllPaginated = (
  search: string,
  pagination: PageRequest
): AxiosPromise<PaginationData> =>
  axios.get(`/developers/paginated?${search}`, {
    params: {
      ...pagination,
    },
  });

export const save = (
  developer: DevelopersDto,
  id?: string, 
): AxiosPromise<any> =>
  id && id !== 'new'
  ? axios.put(`/developers/${developer._id}`, developer)
  : axios.post("/developers", developer);

export const remove = (id: string): AxiosPromise<void> =>
  axios.delete(`/developers/${id}`);