// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third Party Imports
import qs from 'qs'

// ** Types
import {
  FindOneProjectParamsType,
  FindOneProjectTransformResponseType,
  FindOneProjectResponseType
} from 'src/types/api/projectTypes'

const PROJECT_API_REDUCER_KEY = 'projectApi'
export const projectApi = createApi({
  reducerPath: PROJECT_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL as string }),
  endpoints: builder => ({
    findOne: builder.query<FindOneProjectResponseType, FindOneProjectParamsType>({
      query: params => ({
        url: `/api/project?${qs.stringify({
          ...params
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindOneProjectTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindOneQuery } = projectApi
