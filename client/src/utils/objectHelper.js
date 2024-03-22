export const updateObjectInArray=(items,itemsId,objPropName,newObjProps,act)=>{
   
    if (act==="save") {
        const s=items.map((u,ind)=>{if (u[objPropName]===itemsId) {return {ind:ind}}
    else {return{ind:-1}}
                                   })
    const [index]=s.filter(e=>e.ind>-1)
 
    return items.splice(index.ind,1)
    } 
    else {
   
    return items.map(u=>{
 
        if  (u[objPropName]===itemsId) { 
                                        
            return {...u, ...newObjProps}
        } else 
          return {...u}
                        })
         }
}