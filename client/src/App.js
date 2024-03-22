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
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Loader from './components/Users/Loader';
import 'materialize-css'


const App = (props) => {
       
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
                           element={ <DialogsContainer  /> }/>

                    <Route path='/profile/:userId?'
                           element={<ProfileContainer /> }/>
                    <Route path='/settings'
                           element={<Setings
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
const mapStateToProps=(state)=>({
       initialized:state.app.initialized
})

export default compose(connect(mapStateToProps,{initialize})(App));
