import React, { useEffect } from 'react';
import styles from './users.module.css';
import userPhoto from "./mult-ava-instagram-58.jpg";


import Paginator from '../common/Paginator';
import { useDispatch, useSelector } from 'react-redux';
import { GetPeopleSel, getCurrentPageP, getPageSizeP, getTotalUserCountP, getfilterP } from '../../redux/users-selectors';
import { GetPeopleThunk } from '../../redux/people_reducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../redux/redux-store';
import { AnyAction } from 'redux';
type PropsType={}

export const People:React.FC<PropsType>=({})=>{
    
    const totalUserCount=useSelector(getTotalUserCountP);
    const currentPage=useSelector(getCurrentPageP);
    const pageSize=useSelector(getPageSizeP); 
    const filtr=useSelector(getfilterP);
    type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;
     const dispatch:AppDispatch=useDispatch();
 
     const onPageChange=(pageNum:number,page:number)=> 
     {
       dispatch(GetPeopleThunk(pageNum,page,filtr))
     }
     useEffect(()=>{dispatch(GetPeopleThunk(currentPage,pageSize,filtr))},[])
  const peoples=useSelector(GetPeopleSel);
  
    return <div>
    <Paginator totalItemsCount={totalUserCount} pageSize={pageSize}
    curerentPage={currentPage} onPageChange={onPageChange}  />

 

    <table>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Id</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Dr</th>
            <th>ENP</th>
            
            </tr>
            </thead>
            <tbody>
    { peoples.map(u => (
        <>{u.ID?
    
    <tr key={u.ID} onDoubleClick={()=>{}} > 
<td> <img src={u.PHOTO != null ? u.PHOTO:userPhoto} className={styles.userPhoto} />
         </td>
        <td>{u.ID}</td>
        <td>{u.FAM}</td>
        <td>{u.OT}</td>
        <td></td>
        <td>{u.ENP}</td>

      </tr>:<></>}</>))
}
</tbody>
    </table>
           
    <div className='container'>
 <div className='row'>
    <div className='col s6 offset-s3'>
<div className='card blue lighten-5'>
<div className='card-content blue-text'>


</div>
</div>
</div>
</div>
</div>      
  
        
   </div>
}



