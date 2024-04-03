import React from 'react';
import './App.css';

import { compose } from 'redux';
import UsersContainer from './components/Users/UsersContainer'
import {connect}  from "react-redux";
import Navbar from './components/Navbar/Navbar';
import {initialize} from './redux/app-reducer'
import { useEffect } from 'react';
import {Route,Routes} from 'react-router-dom'

import LoginPage from './components/Login/login'
import Setings from './components/Setings/Setings';
import {store}  from "./redux/redux-store";

import {BrowserRouter} from 'react-router-dom';

import {Provider} from "react-redux";


import HeaderContainer from './components/Header/HeaderContainer';
import Loader from './components/Users/Loader';
import 'materialize-css'
import { AppState } from './redux/redux-store';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import { People } from './components/People/People';

const DialogsContainer=React.lazy(()=>import ('./components/Dialogs/DialogsContainer'));
const ProfileContainer= React.lazy(()=> import ('./components/Profile/ProfileInfo/ProfileContainer'));
type MapDispatchProps={
       initialize:()=>void
}

const App:React.FC<TueStateToProps&MapDispatchProps> = (props) => {
       
       useEffect(()=>{
              props.initialize();
          },[props.initialized]) 
          
         
    if (!props.initialized) {return <Loader/>}
    return (<>    
     
            <div className='app-wrapper'>
              <div className='a'> <HeaderContainer /> </div>
              <div className='b'>
                <Navbar />
                </div>
                <div className='c'>
                
         <Routes>
                    <Route path='/dialogs'
                           element={ <React.Suspense fallback={<div><Loader/></div>} ><DialogsContainer />
                           </React.Suspense>   }/>

                    <Route path='/profile/:userId?'
                           element={<React.Suspense fallback={<div><Loader/></div>} ><ProfileContainer />
                           </React.Suspense> }/>
                    <Route path='/settings'
                           element={<Setings
                                /> }/> 
                                   <Route path='/people'
                           element={<People
                                /> }/>      
                     <Route path='/users'
                           element={<UsersContainer
                                /> }/>    
                                  
                              
                     <Route path='/login'
                           element={<LoginPage
                                /> }/>      
                              </Routes> </div>
                              <div className='app-wrapper-content'> 2024 
                </div>
            </div>
            
            
           </> 
        )
}

const mapStateToProps=(state:AppState)=>({
       initialized:state.app.initialized
})
type TueStateToProps=ReturnType<typeof mapStateToProps>;

let Appcomp= compose<React.ComponentState>(connect(mapStateToProps,{initialize})(App));
const Proect:React.FC=()=>{return <BrowserRouter>
 
 <QueryParamProvider adapter={ReactRouter6Adapter}>
 
<Provider store={store}>

    <Appcomp />
   
    </Provider>
    </QueryParamProvider>
   
    </BrowserRouter>}
    export default Proect;
