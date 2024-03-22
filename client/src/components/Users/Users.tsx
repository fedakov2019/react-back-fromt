import React from 'react';
import styles from './users.module.css';
import userPhoto from "./mult-ava-instagram-58.jpg";

import NatifCont from '../natification/natificationContainer'
import ProfileUserFormRedux from './UsersDataForms';
import Paginator from '../common/Paginator';
import { ProfileTypeUser, UserType } from '../../types/types';

import DeleteIcon from '@mui/icons-material/Delete';
import SuccessIcon from '@mui/icons-material/Done';
import ExitIcon from '@mui/icons-material/Cancel';
import Button  from '@mui/material/Button';

import { createTheme,ThemeProvider} from '@mui/material/styles';

 const grenTheme=createTheme({ palette: {
  success:{
    
      main: '#5DBA40',
    },

 } });
 
 
 



  
type PropsType={
    currentPage:number,
    totalUserCount:number,
    pageSize:number,
    onPageChange:(pageNumber:number,page:number)=> void,
   
    users:Array<UserType>,
    followingInProgress: Array<number>,
    profile:ProfileTypeUser,
    LoginSave:(login:ProfileTypeUser,pageSize:number,currentPage:number)=>void,
    handleButtonClick:(act:string,user:UserType)=> void,
   
    ontrtable:(id:number)=>void,
    UpdateProfile:(login:ProfileTypeUser)=>void
}
const Users:React.FC<PropsType>=({currentPage,totalUserCount,pageSize,profile,ontrtable,onPageChange,handleButtonClick,LoginSave,users,UpdateProfile,...props})=>{
    
    
    const onSubmit =(formUserSave:ProfileTypeUser)=>{
      LoginSave(formUserSave,pageSize,currentPage);
      
     
      
    
  } 
 const resets=()=>{
  UpdateProfile({id:0, Password:'',Login:'',Acces:false})
 }
  
  
    return <div>
    <Paginator totalItemsCount={totalUserCount} pageSize={pageSize}
    curerentPage={currentPage} onPageChange={onPageChange} key='1' />

    <NatifCont key='2'/>

    <table>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Id</th>
            <th>Login</th>
            <th>Admin</th>
            <th colSpan={2}></th>
            
            </tr>
            </thead>
            <tbody>
    { users.map(u => (
        <>{u.id ?
    
    <tr key={u.id} onDoubleClick={()=>ontrtable(u.id)} > 
<td> <img src={u.photos.small != null ? u.photos.small:userPhoto} className={styles.userPhoto} />
         </td>
        <td>{u.id}</td>
        <td>{u.LOGIN}</td>
        <td>{u.acces?"Да":"НЕТ"}</td>
        {u.isDelete ? (<> 
                <td> 
                <ThemeProvider theme={grenTheme}>
                  <Button   variant="contained"
                  
        
        color='success'
        

        size="small"
        //className={classes.button}
        startIcon={<SuccessIcon />}
        disabled={props.followingInProgress.some(id=>id===u.id)}       
                  
                  
                  onClick={() => {
                    handleButtonClick("save", u)}}>
                    Ok
                  </Button>
                  </ThemeProvider>
                  
                  </td>
                  <td>
                  <Button 
                    variant="contained"
                    color="primary"
                    size="small"
                   // className={classes.button}
                    startIcon={<ExitIcon />}
                  
                  
                  onClick={() => handleButtonClick("cancel", u)}>
                    Отменить
                  </Button>
                </td></>
              ) : (<td colSpan={2}>
                 <ThemeProvider theme={grenTheme}>
                <Button variant="contained"
                color='error'
                //className={classes.button}
                size="small"
                startIcon={<DeleteIcon />}
               
                 onClick={() => handleButtonClick("edit", u)}>
                  Удалить
                </Button>
                </ThemeProvider>
                
</td>)}
        
    </tr>:<></>}</>))
}
</tbody>
    </table>
           
    <div className='container'>
 <div className='row'>
    <div className='col s6 offset-s3'>
<div className='card blue lighten-5'>
<div className='card-content blue-text'>

<ProfileUserFormRedux   onSubmit={onSubmit} userid={profile.id} resets={resets} />
</div>
</div>
</div>
</div>
</div>      
  
        
   </div>
}
export default Users;