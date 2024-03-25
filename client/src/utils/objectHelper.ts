export const updateObjectInArray=(items:any,itemsId:any,objPropName:any,newObjProps:any,act:string)=>{
   
    if (act==="save") {
        const s=items.map((u:any,ind:number)=>{if (u[objPropName]===itemsId) {return {ind:ind}}
    else {return{ind:-1}}
                                   })
    const [index]=s.filter((e:any)=>e.ind>-1)
 
    return items.splice(index.ind,1)
    } 
    else {
   
    return items.map((u:any)=>{
 
        if  (u[objPropName]===itemsId) { 
                                        
            return {...u, ...newObjProps}
        } else 
          return {...u}
                        })
         }
}