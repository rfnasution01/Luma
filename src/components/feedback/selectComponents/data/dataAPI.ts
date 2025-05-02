import { api, Res } from '@/store/api'
import { ResReferensiType } from './dataType'

export const ReferensiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getReferensiUmum: builder.query<Res<ResReferensiType[]>, { link: string }>({
      query: ({ link }) => ({
        url: `referensi/${link}`,
        method: 'GET',
      }),
    }),

    getProvinsi: builder.query<Res<ResReferensiType[]>, void>({
      query: () => ({
        url: `referensi/provinsi`,
        method: 'GET',
      }),
    }),
    getKabupaten: builder.query<
      Res<ResReferensiType[]>,
      { idProvinsi: string }
    >({
      query: ({ idProvinsi }) => ({
        url: `referensi/kabupaten/${idProvinsi}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetReferensiUmumQuery,
  useGetProvinsiQuery,
  useGetKabupatenQuery,
} = ReferensiEndpoints
