import { baseApi } from "./baseApi";

export type Question = {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
};

export const questionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], void>({
      query: () => "/getQuestions",
    }),
  }),
});

export const { useGetQuestionsQuery } = questionsApi;