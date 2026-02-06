import { baseApi } from "./baseApi";

export type CategoryImage = {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
};

export type Category = {
  id: number;
  name: string;
  title: string;
  rank: number;
  image: CategoryImage;
};

export type CategoriesResponse = {
  data: Category[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "/getCategories",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;