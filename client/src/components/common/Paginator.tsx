import  styles from './Paginator.module.css'
import { useState } from 'react';
import {Select,MenuItem} from '@mui/material'
type PropsType={
    totalItemsCount:number,
    pageSize:number,
    curerentPage:number,
    onPageChange:(pageNumber:number,pg:number)=> void,
 
   
}
const Paginator:React.FC<PropsType>=({totalItemsCount,pageSize,curerentPage,onPageChange}
    )=>{
        debugger;
    const pageCount=Math.ceil(totalItemsCount/pageSize);
const pages=[];

for (let i=1;i<=pageCount;i++){
    pages.push(i);
}



const OnPage=(e:any)=>{
    const pageNumber=e.target.value ? Number(e.target.value):1
      
    onPageChange(pageNumber,pageSize) 
}


const nextPage=()=>{
 
    onPageChange((curerentPage+1),pageSize)
    
   }
   const previousPage=()=>{
      
       onPageChange((curerentPage-1),pageSize);
    
    }
    const canNextPage=(pages.indexOf(curerentPage+1,0)===-1?false:true)
    const  canPreviousPage=(pages.indexOf(curerentPage-1,0)===-1?false:true)
    
  

return  <div key='2u'>
    <p/>
<span key='1z'>
    Страница{' '}
    <strong>
       {curerentPage} of {pageCount}
    </strong> {' '}
</span>
<span key='2z'>
    | Перейти на:{' '}
    <input type='number'
    min={1}
    max={pageCount}
    defaultValue={curerentPage}
    onChange={OnPage}
    style={{width:'50px'}} />


</span> <a>  </a>
<Select value={pageSize} onChange={(e) => {

pageSize=Number(e.target.value);
onPageChange(1,pageSize);

}
}>
   
{[2,5,10,15,20,25].map((pageS)=>(
    <MenuItem key={pageS} value={pageS}>
       Записей на странице {pageS}

    </MenuItem>
))}

</Select>
<a>  </a>

<button onClick={() => {onPageChange(1,pageSize);

}} disabled={!canPreviousPage}>
    {'⇚'}


</button>

   <button onClick={( )=> previousPage()} disabled={!canPreviousPage}>⇤Предыдущая</button>
   <button onClick={()=> nextPage()} disabled={!canNextPage}>Следующая⇥</button>
    <button onClick={() => {onPageChange(pageCount,pageSize)
    }
} disabled={!canNextPage}>
   {'⇛'}

    
</button>


       </div>













    }
    export default Paginator;