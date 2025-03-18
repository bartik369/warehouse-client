import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { IContractor } from "../../types/devices";

export const contractorApi = createApi({
    reducerPath: 'contractorApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints:(build) => ({
        getContractors: build.query<IContractor[], void>({
            query: () => ({
                url: `${import.meta.env.VITE_CONTRACTORS}`,
            })
        }),
        getContractor: build.query({
            query:(id:string) => ({
                url: `${import.meta.env.VITE_CONTRACTORS}${id}`,
            })
        }),
        createContractor: build.mutation({
            query(body) {
                return {
                    url: `${import.meta.env.VITE_CONTRACTORS}`,
                    method: "POST",
                    body,
                }
            }
        })
    })
});

export const { 
    useCreateContractorMutation, 
    useGetContractorsQuery,
    useLazyGetContractorQuery,
 } = contractorApi;