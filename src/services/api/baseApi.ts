import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummy-api-jtg6bessta-ey.a.run.app",
  }),
  endpoints: () => ({}),
});