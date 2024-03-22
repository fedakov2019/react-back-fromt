import { createSelector } from "reselect";
import { AppState } from "./redux-store";

export const GetUsersSel=(state:AppState)=>{
    return state.usersPage.users;
}
export const GetUsers=createSelector(GetUsersSel,(users)=>{
   return users.filter(u=>true);
})
export const getPageSize=(state:AppState)=>{
    return state.usersPage.pageSize;
}
export const getUserUpdate=(state:AppState)=>{
    return state.usersPage.usersUpdate;
}
export const getUserProfile=(state:AppState)=>{
    return state.usersPage.profileus;
}

export const getCurrentPage=(state:AppState)=>{
    return state.usersPage.currentPage
}
export const getTotalUserCount=(state:AppState)=>{
return state.usersPage.totalUserCount;
}
export const getIsFetching=(state:AppState)=>{
   return state.usersPage.isFetching;  
}
export const getFollowingInProgress=(state:AppState)=>{
    return state.usersPage.followingInProgress;
}


