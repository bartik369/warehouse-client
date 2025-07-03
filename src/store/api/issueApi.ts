import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const issueApi = createApi({
  reducerPath: "issueApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (build) => ({
    getIssueProcessById: build.query<any, string>({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}${id}`,
      }),
    }),
    createIssueProcess: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}`,
        method: "POST",
        body,
      }),
    }),
    createIssue: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_ISSUE}`,
        method: 'POST',
        body,
      })
    }),
    getIssueProcess: build.query({
      query: (processid) => ({
        url: `${import.meta.env.VITE_ISSUE_PROCESS}${processid}`,
      })
    }),
    finalizeIssueProcess: build.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_ISSUE_FINALIZE}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetIssueProcessByIdQuery,
  useCreateIssueMutation,
  useFinalizeIssueProcessMutation,
  useCreateIssueProcessMutation,
} = issueApi;
