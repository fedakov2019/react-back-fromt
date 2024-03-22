
export type ValidatorType=(value:string)=>string|undefined
export const required:ValidatorType=(value)=>{
if (value) return undefined;
return "Поле не заполнено"
}
export const maxLengthCreator=(minLenght:number):ValidatorType=>(value)=>{
    
    if (String(value).length  < minLenght) 
    return `Минимальная длинна  ${minLenght} символа`;
return undefined
}