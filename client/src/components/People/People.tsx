import React, { useEffect } from 'react';
import styles from './people.module.css';
import userPhoto from './ava-mult-vk-72.jpg';


import Paginator from '../common/Paginator';
import { useDispatch, useSelector } from 'react-redux';
import { GetPeopleSel, getCurrentPageP, getPageSizeP, getTotalUserCountP, getfilterP } from '../../redux/users-selectors';
import { Filtr, GetPeopleThunk } from '../../redux/people_reducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../redux/redux-store';
import { AnyAction } from 'redux';
import { useFormik,  } from 'formik';

import {Button, Input,InputLabel,MenuItem,Select, TextField} from '@mui/material/';
import { PeopleType } from '../../types/types';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import { getURLParams } from '../../utils/htmlsearch';
import { useSearchPeopleQuery } from '../../service/Peopleservice';


type PropsType={}

export const People:React.FC<PropsType>=({})=>{
  let [searchValueENP, SetSearchValueENP]=useQueryParam("enp",StringParam);
  let [searchValuepage,SetSearchValuepage]=useQueryParam("page",NumberParam);
  let [searchValuepagePrz,SetSearchValuePrz]=useQueryParam("przpoisk",NumberParam);
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
     const setPeopleFiltr=(filtr:Filtr)=>{
      dispatch(GetPeopleThunk(1,pageSize,filtr))
     }
     useEffect(()=>{
      const value=getURLParams();
      let actualpage=currentPage;
      if (!!value?.page) actualpage=Number(value.page);
      let actualfilter=filtr;
      if (!!value?.enp) actualfilter={...actualfilter,enp:value.enp}
      if (!!value?.przpoisk) actualfilter={...actualfilter,przpoisk:Number(value.przpoisk)}
      
      dispatch(GetPeopleThunk(actualpage,pageSize,actualfilter))},[])
      
     useEffect(()=>{
    
      if (filtr.enp?.trim()!=="" && peoples.length>1) SetSearchValueENP(filtr.enp);
      if (!!filtr.przpoisk) SetSearchValuePrz(filtr.przpoisk);
      if (!!currentPage) SetSearchValuepage(currentPage); 
    
  
    
    
     },[currentPage,filtr])

     const Formiks:React.FC=()=>{
      const filter=useSelector(getfilterP);
 const formik=useFormik({
  enableReinitialize:true,
  initialValues:{ enp: filtr.enp,przpoisk:filter.przpoisk },



 onSubmit:(values, { setSubmitting }) => {
 
   const df:Filtr={enp:values.enp,przpoisk:Number(values.przpoisk)} 
 
     setPeopleFiltr(df);
 
     setSubmitting(false);
 
 
 
 }})


return (<div>

 
<form onSubmit={formik.handleSubmit}>
    <div className="col s12">
      
      
        <div className="row">
          <div className="input-field col s4">
   
          <TextField 
         
          variant="standard"
       
          name="enp"
          label="ENP" value={formik.values.enp}
          onChange={formik.handleChange}
          />
   
      
  </div>
 
<div className="input-field col s6">
<InputLabel id="select-label">Выбор признака…  </InputLabel> 
 <Select className="input-field col s8"  labelId="select-label"  
 name='przpoisk' 
 id="select"
 value={formik.values.przpoisk}
          onChange={formik.handleChange}
          label="Выбор признака…"
          >
    
  
  <MenuItem value={0}>Все</MenuItem >
  
  <MenuItem value={1}>Жиывые</MenuItem >
  
  <MenuItem value={2}>Живые и застрахованные</MenuItem >
  
  </Select>
  
  </div>
    
    
  <div className="input-field col s1">
     
  
      <Button type="submit" disabled={formik.isSubmitting} variant="contained"
        color="primary">
  
        Поиск
  
      </Button>
      </div>
      </div>
  
  
  
  </div>
  </form>
  </div>
)



     }

     
    const {isLoading,isError,data}=useSearchPeopleQuery({pageSize:1,curentPage:20,filtr:{enp:'',przpoisk:0}});
    console.log(isLoading);
    console.log(isError);
    console.log(data);
  const peoples=useSelector(GetPeopleSel) as Array<PeopleType>;
  
    return <div>
      <div className="row">
<Formiks />


</div>


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
    { peoples.length>1?  peoples?.map(u => (
        <>{u.ID?
    
    <tr key={u.ID} onDoubleClick={()=>{}} > 
<td> <img src={u.PHOTO != null ? 'data:image/jpeg;base64,'+u.PHOTO:userPhoto} className={styles.userPhoto} />
         </td>
        <td>{u.ID}</td>
        <td>{u.FAM}</td>
        <td>{u.IM}</td>
        <td>{u.OT}</td>
        <td>{u.DR}</td>
        <td>{u.ENP}</td>

      </tr>:<></>}</>)): <></>
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



