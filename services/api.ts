// services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://t-core.fit-hub.pro/Test/'

export const api = createApi({
    reducerPath: 'tariffs',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getItems: builder.query<any[], void>({
            query: () => '/GetTariffs', // эндпоинт твоего GET запроса
        }),
    }),
})

export const { useGetItemsQuery } = api
