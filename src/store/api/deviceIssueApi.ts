import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const deviceIssueApi = createApi({
    reducerPath: 'deviceIssueApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints: (build) => ({
        getIssue: build.query<any, string>({
            query: (id: string) => ({
                url: `${import.meta.env.VITE_DEVICE_ISSUE}${id}`,
            })
        })
    })
});

export const {
    useLazyGetIssueQuery,
} = deviceIssueApi;
