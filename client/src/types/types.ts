export type PostType={
    id:number,
    message:string,
    likesCount:number
}
export type ContactsType={
    github:string,
    vk:string,
    facebook:string,
    instagram:string,
    twitter:string,
    website:string,
    youtubs:string,
    mainLink:string

}
export type PhotosType={
    small:string|null,
    large:string|null
}
export type ProfileTypeUser={
    id:number,
    Login:string,
    Password:string,
    Acces:boolean
}
export type ProfileType={
    userId:number,
    lookingForAJob:boolean,
    lookingForAJobDescription:string,
    fullName:string,
    contacts:ContactsType,
    photos:PhotosType,
    aboutMe:string
}
export type UserType={
    id:number,
    LOGIN:string,
    acces:string,
    photos:PhotosType,
    
    isDelete:boolean,
    followed:boolean
}
export type PeopleType={
    FAM:string,
    IM:string,
    OT:string,
    W:number,
   
    DR:string,
  
    MR:string
    DS:string,
    SS:string,
    DOCORGCODE:string,
    DOCTP:number,
    DOCS:string,
    DOCN:string,
    DOCDT:string,
    DOCORG:string,
    DOCEND:string,
    RDOCTP:number,
    RDOCS:string,
    RDOCN:string,
    RDOCDT:string,
    RDOCORG:string,
    RDOCEND:string,
    BIRTH_OKSM:string,
    CN:string,
    SUBJ:string,
    RN:string,
    INDX:string,
    RNNAME:string,
    CITY:string,
    NP:string,
    UL:string,
    DOM:string,
    KOR:string,
    KV:string,
    DMJ:string,
    BOMJ:number,
    KATEG:number,
    PSUBJ:string,
    PRN:string,
    PINDX:string,
    PRNNAME:string,
    PCITY:string,
    PNP:string,
    PUL:string,
    PDOM:string,
    PKOR:string,
    PKV:string,
    PDMJ:string,
    EMAIL:string,
    PHONE:string,
    ENP:string,
    Q:string,
    QOGRN:string,
    PRZ:string,
    OPDOC:number,
    SPOL:string,
    NPOL:string,
    OKATO:string,
    
    DBEG:string,
    DEND:string,
    DSTOP:string,
  
  
    RSTOP:number,
    LPU:string,
    LPUWK:string,
    LPUST:string,
    LPUUCH:string,
    LPUAUTO:number,
    LPUDT:string,
    LPUDX:string,
   
 
    FIOPR:string,
    CONTACT:string,
 
    PHOTO:string,
    SIGNAT:string,
    
    ID:number,
    PID:number,
  
    REMARK:string,
  
    OIP:string
}


export interface IAlert {
    id: string,
    status: TColors,
    message: string,
    timeout: number,
}
export type TColors = 'success'|'error'|'warning'|'info';