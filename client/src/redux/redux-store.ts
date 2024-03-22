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

const reducer =combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogReducer,
    sidebar:sidebarReducer,
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
const store=createStore(reducer,composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;