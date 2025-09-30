// services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://t-core.fit-hub.pro/Test/'

export type Tariff = {
    id: string
    period: string
    price: number
    full_price: number
    is_best: boolean
    text: string
}

export const api = createApi({
    reducerPath: 'tariffs',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getItems: builder.query<Tariff[], void>({
            query: () => '/GetTariffs',
        }),
    }),
})

export const { useGetItemsQuery } = api
