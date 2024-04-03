import { People } from './../components/People/People';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Filtr } from '../redux/people_reducer'
import { PeopleType } from '../types/types'
type argtypy={
    curentPage:number,
    pageSize:number,
    filtr:Filtr
}
type People= Array<PeopleType>
export const peopleAPI=createApi({
reducerPath:'PeopleAPI',
tagTypes:['People'],
baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8080/'}),
endpoints:(build)=>({
    searchPeople:build.query<People,argtypy>({
    query:({curentPage,pageSize,filtr})=>({
        
    
        url:`/api/enp/page=${curentPage}/count=${pageSize}/enp=${filtr.enp}/przpoiska=${filtr.przpoisk}`,
        
    })
})
})
})
export const {useSearchPeopleQuery} =peopleAPI