import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import profileReducer from "./profile-reducer"
import dialogReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reduser"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import  thunkMiddleware, { ThunkAction }  from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer"
import natifReduser from './natification-reduser'

import { composeWithDevTools } from 'redux-devtools-extension';
import peopleReducer from "./people_reducer"
import { peopleAPI } from "../service/Peopleservice"
import { configureStore } from "@reduxjs/toolkit"
import { defaultOptions } from "use-query-params/dist/options"
import { userAPI } from "../api/User_api"
import { profileAPI } from "../api/profile_api"
import { authAPI } from "../api/auth_api"

const reducer =combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogReducer,
    sidebar:sidebarReducer,
    people:peopleReducer,
    [peopleAPI.reducerPath]:peopleAPI.reducer,
    usersPage: usersReducer,
    auth: authReducer,
    form : formReducer,
    app:appReducer,
    nat:natifReduser
});
type RootReducserType=typeof reducer;
export type AppState=ReturnType<RootReducserType>;
export type PropertiesType<T>= T extends {[key:string]:infer U} ?U :never
export type BaseThunkType<A extends Action,R=Promise<void>>=ThunkAction<R, AppState, unknown,A>

const middlewares = [thunkMiddleware];
//const store=()=>{return configureStore({
//    reducer,
//    middleware:(getDefaultMiddlware)=>getDefaultMiddlware().concat(peopleAPI.middleware)
//})}

//const store=createStore(reducer,composeWithDevTools((applyMiddleware(...middlewares))));
export const store=configureStore({
    reducer:reducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk:{extraArgument: {userAPI,profileAPI,authAPI}}}).concat(peopleAPI.middleware)
    
})
export default store;