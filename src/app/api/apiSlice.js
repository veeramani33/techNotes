import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://technotes-api-82bq.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async( args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 403){
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refreshResult?.data){
            api.dispatch(setCredentials({ ...refreshResult.data }))

            result = await baseQuery(args, api, extraOptions)
        }else{
            if(refreshResult?.error?.status === 403){
                refreshResult.error.data.message = "Your login has been expired."
            }
        }
        return refreshResult
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth, // backend Url for fetch data
    tagTypes: ['Note', 'User'], //collection name for caching and invalidating the data
    endpoints: builder => ({}) // we can extend the url based on requirement in future
})
