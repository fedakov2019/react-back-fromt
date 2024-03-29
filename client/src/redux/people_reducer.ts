import { FormAction, stopSubmit } from 'redux-form';
import { Dispatch } from 'redux';

import {v4} from 'uuid';
import { Observable, Subject } from 'rxjs';
import {IAlert,PeopleType,TColors } from "../types/types";
import {ResultCode} from '../api/api';
import {userAPI} from '../api/User_api';
import { UserType,ProfileTypeUser } from '../types/types';

import { updateObjectInArray } from '../utils/objectHelper';
import {  BaseThunkType,PropertiesType } from './redux-store';



const SET_PEOPLE='PEOPLE/SET_PEOPLE';

const SET_TOTAL_PEOPLE_COUNT='PEOPLE/SET_TOTAL_PEOPLE_COUNT';
const SET_CURRENT_PAGE_P='PEOPLE/SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING_P='PEOPLE/TOGGLE_IS_FETCHING';

const SET_PEOPLE_PROFILE='PEOPLE/SET_USER_PROFILE';
const SET_PAGESIZE_PEOPLE='PEOPLE/SET_PAGESIZE';
type Filtr={
    enp:string|null,
    przpoisk:number
}
const initialState={
    people: [] as Array<PeopleType>,
    pageSizeP:20,
    totalCountP:0,
    currentPageP:1,
    isFetchingP:false,
   filter:{enp:'3668150831000',przpoisk:0} as Filtr,
   
    profilePeople: { FAM:'', IM:'',OT:'',W:0, DR:'',MR:'',DS:'',SS:'',DOCORGCODE:'',DOCTP:0,DOCS:'',
        DOCN:'',DOCDT:'',DOCORG:'',DOCEND:'',RDOCTP:0,RDOCS:'',RDOCN:'', RDOCDT:'',RDOCORG:'',
        RDOCEND:'',BIRTH_OKSM:'',CN:'',SUBJ:'',RN:'',INDX:'',RNNAME:'',CITY:'',NP:'',UL:'',
        DOM:'',KOR:'',KV:'',DMJ:'',BOMJ:0,KATEG:0,PSUBJ:'',PRN:'',PINDX:'',PRNNAME:'',PCITY:'',
        PNP:'',PUL:'',PDOM:'',PKOR:'',PKV:'',PDMJ:'',EMAIL:'',PHONE:'',ENP:'',Q:'',QOGRN:'',
        PRZ:'',OPDOC:0,SPOL:'',NPOL:'',OKATO:'',DBEG:'',DEND:'',DSTOP:'',RSTOP:0,
        LPU:'',LPUWK:'',LPUST:'',LPUUCH:'',LPUAUTO:0,LPUDT:'',LPUDX:'',FIOPR:'',
        CONTACT:'',PHOTO:'',SIGNAT:'',ID:0,PID:0,REMARK:'',OIP:''} as PeopleType,
}
type InitialStateType=typeof initialState;
type ActionType= ReturnType<PropertiesType<typeof actions>>
const peopleReducer = (state=initialState, action:ActionType):InitialStateType=>{
  
switch (action.type)
{
    case SET_PEOPLE_PROFILE:
    return {...state,profilePeople:action.profile_People}


    
case SET_PEOPLE:
    {
        return {...state,// ...state.users,
        people: action.people}
    }
    case SET_CURRENT_PAGE_P:
    {
        return {...state, currentPageP: action.currentPage}
    }
    case TOGGLE_IS_FETCHING_P:
        {
            return {...state,isFetchingP:action.isFetching}
        }
    case SET_TOTAL_PEOPLE_COUNT:
    {
        return {...state, totalCountP: action.count}
    }

 


case SET_PAGESIZE_PEOPLE:
    return {...state, pageSizeP: action.pagesize}

default:
    return state;
}}


export const actions={
    setPeopleProfile:(profile_People:PeopleType) =>({type:SET_PEOPLE_PROFILE,profile_People} as const),


setPagesizeP:(pagesize:number)=>({type:SET_PAGESIZE_PEOPLE, pagesize} as const),
setPeople:(people: Array<PeopleType>) => ({type:SET_PEOPLE, people}as const), 

setCurrentPageP :(currentPage:number) => ({type:SET_CURRENT_PAGE_P, currentPage} as const),

setTotalUsersCountP :(totalUserCount:number) => ({type:SET_TOTAL_PEOPLE_COUNT, count:totalUserCount} as const),



 toggleIsFetching:(isFetching:boolean) =>({type: TOGGLE_IS_FETCHING_P,isFetching}as const),

}

    type GetDispatchType=Dispatch<ActionType>
    type ThunkType=BaseThunkType<ActionType|FormAction>
export const GetPeopleThunk=(currentPage:number,pageSize:number,filtr:Filtr):ThunkType=> async (dispatch:any) =>{

    dispatch(actions.toggleIsFetching(true));
    const data=await userAPI.getPeople(currentPage,pageSize,filtr.enp,filtr.przpoisk)
    
    if (data.totalCount!==0){
        
        dispatch(actions.toggleIsFetching(false));
       
        const items=data.peoples
       const pr={};
        dispatch(actions.setPeople(items));    
        dispatch(actions.setCurrentPageP(currentPage));
        dispatch(actions.setPagesizeP(pageSize));
      dispatch(actions.setPeopleProfile({ FAM:'', IM:'',OT:'',W:0, DR:'',MR:'',DS:'',SS:'',DOCORGCODE:'',DOCTP:0,DOCS:'',
        DOCN:'',DOCDT:'',DOCORG:'',DOCEND:'',RDOCTP:0,RDOCS:'',RDOCN:'', RDOCDT:'',RDOCORG:'',
        RDOCEND:'',BIRTH_OKSM:'',CN:'',SUBJ:'',RN:'',INDX:'',RNNAME:'',CITY:'',NP:'',UL:'',
        DOM:'',KOR:'',KV:'',DMJ:'',BOMJ:0,KATEG:0,PSUBJ:'',PRN:'',PINDX:'',PRNNAME:'',PCITY:'',
        PNP:'',PUL:'',PDOM:'',PKOR:'',PKV:'',PDMJ:'',EMAIL:'',PHONE:'',ENP:'',Q:'',QOGRN:'',
        PRZ:'',OPDOC:0,SPOL:'',NPOL:'',OKATO:'',DBEG:'',DEND:'',DSTOP:'',RSTOP:0,
        LPU:'',LPUWK:'',LPUST:'',LPUUCH:'',LPUAUTO:0,LPUDT:'',LPUDX:'',FIOPR:'',
        CONTACT:'',PHOTO:'',SIGNAT:'',ID:0,PID:0,REMARK:'',OIP:''}));
        dispatch(actions.setTotalUsersCountP(data.totalCount));

    }
        
}

  export const GetPeopleProfile=(userId:number)=>async(dispatch:any)=>{ 
    
   // const data= await userAPI.getProfilePeople(userId);
    
    //if (data.id ) {
      //  dispatch(actions.setPeopleProfile({...data}));
    

  //}
}

export default peopleReducer;