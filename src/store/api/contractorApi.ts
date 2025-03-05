import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { IContractor } from "../../types/devices";

export const contractorApi = createApi({
    reducerPath: 'contractorApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints:(build) => ({
        getContractor: build.query<IContractor, void>({
            query: () => ({
                url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_CONTRACTORS}`,
            })
        }),
        createContractor: build.mutation({
            query(body) {
                return {
                    url: `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_CONTRACTORS}`,
                    method: "POST",
                    body,
                }
            }
        })
    })
});

export const { useCreateContractorMutation, useGetContractorQuery } = contractorApi;