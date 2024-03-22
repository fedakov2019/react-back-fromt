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
    photos:PhotosType
}
export type UserType={
    id:number,
    LOGIN:string,
    acces:string,
    photos:PhotosType,
    
    isDelete:boolean,
    followed:boolean
}
export interface IAlert {
    id: string,
    status: TColors,
    message: string,
    timeout: number,
}
export type TColors = 'success'|'error'|'warning'|'info';