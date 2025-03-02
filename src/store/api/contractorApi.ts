import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const contractorApi = createApi({
    reducerPath: 'contractorApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints:(build) => ({
        createContractor: build.mutation({
            query(body) {
                return {
                    url: "",
                    method: "POST",
                    body,
                }
            }
        })
    })
});

export const { useCreateContractorMutation } = contractorApi;