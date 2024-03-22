
import styles from "./FormsControls.module.css"
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { ValidatorType } from "../../../utils/validators/validators";

import React from "react";
type TFormControlParama ={
    meta:WrappedFieldMetaProps

    children:React.ReactNode
}


const FormControl:React.FC<TFormControlParama>=({meta:{touched,error},children})=>{
    const hassError =touched && error;
    return(
        <label className={styles.formControl+" "+(hassError?styles.error:"")}>
           <>
           {children}
        </>
        {hassError && <span>{error}</span>}
        <span></span>
        </label>)}
        export const Textarea:React.FC<WrappedFieldProps>=(props)=>{
            const {input,meta,...Rprops}=props
            return (
 <FormControl {...props}><textarea {...input} {...Rprops}/></FormControl>
            )
        }
        export const Input:React.FC<WrappedFieldProps>=(props)=>{
            const {input,meta,...Rprops}=props
            return (
 <FormControl {...props}><input {...input} {...Rprops}/></FormControl>
 
            )
        }

      


        export function createField<TFormKey extends string>(placeholder:string|undefined,
            name:TFormKey, 
            validators:Array<ValidatorType>,
            component:React.FC<WrappedFieldProps>,
            props={},text="") {return (<div>
              <Field placeholder={placeholder} name={name} validate={validators} 
             component={component} {...props} /> 
             {text}
             </div>
            )}
        


