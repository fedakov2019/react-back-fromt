import { ProfileTypeUser } from './../types/types';
import { saveData } from './../redux/profile-reducer';
import { UserType } from "../types/types"
import { instance, ItemT } from "./api"
import { ResponseT } from "./api"


export const userAPI ={
    getUsers(currentPage=1,pageSize=10) {
   
     return  instance.get<ItemT<UserType>>(`/auth/users/page=${currentPage}/count=${pageSize}`
       )
       .then(response => response.data)
        
   },
   getDeletUser(id:number) {
    return instance.delete(`auth/deletUser/${id}`).then(response=>response.data)
   },
   saveDataid(profile:ProfileTypeUser)
   {
    return instance.post('auth/register',{Name:profile.Login,Password:profile.Password,AccesCey:profile.Acces}).then(response=>response.data)
   },
   updateDataid(profile:ProfileTypeUser)
   {
    return instance.post(`auth/register/${profile.id}`,{Name:profile.Login,Password:profile.Password,AccesCey:profile.Acces,id:profile.id}).then(response=>response.data)
   },
   getProfileUser(id:number)
   {
    return instance.get(`auth/user/${id}`).then(response=>response.data)
   },
   getPeople(currentPage=1,pageSize=20,enp:string|null,prz:number)
{
    return instance.post('api/enp',{CurrentPage:currentPage,PadingSize:pageSize,ENP:enp,Przpoiska:prz}).then(response=>response.data)

  }
 }
   