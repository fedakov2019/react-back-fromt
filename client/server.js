const dbOperaton =require('./src/components/Setings/dbFiles/dbOperations')
dbOperaton.getEmployess().then(res=>{console.log(res.recordsets)})