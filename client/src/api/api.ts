import axios from "axios";

export const instance =axios.create({
    withCredentials:true,
    
    baseURL:'http://localhost:8080/',
    headers: {
      
        post: {
          'Content-Type': 'application/json'
        }
      }
});

export const instanceretry =axios.create({
  withCredentials:true,
  
  baseURL:'http://localhost:8080/',
  headers: {
      
      post: {
        'Content-Type': 'application/json'
      }
    }
});
instance.interceptors.request.use((config)=>{config.headers.Authorization=`Bearer ${localStorage.getItem('Token')}`
return config});
instanceretry.interceptors.request.use((config)=>{config.headers.Authorization=`Bearer ${localStorage.getItem('Token')}`
return config})
type LoginType ={user:{id:number,login:string,acces:boolean},tokenaccess:string,tokenrefreh:string}
instanceretry.interceptors.response.use((config:any)=>{return config},(
  async (error:any) => {
    const originalRequest =error.config
        if ((error.response.status == 401) &&(error.config)&&(!error.config._isRetry)) {
            originalRequest._isRetry=true
            try {
                const response =await instance.post<ResponseTe<LoginType>>('/auth/refresh').then()
                localStorage.setItem('Token',response.data.userdata.tokenaccess)
                return instanceretry.request(originalRequest)
            }
catch(e) {
console.log('Не авторизован')
}

        }
    }
))

export type ResponseTe<D={},Rs=ResultCode>={
  userdata:D
  messages:Array<string>
  resultCode:Rs
}
export type ResponseT<D={},Rs=ResultCode>={
    UserData:D
    messages:Array<string>
    resultCode:Rs
}
export enum ResultCode {
    Success = 0,
    Error = 1,}

export type ItemT<T>={
items:Array<T>
totalCount:number
error:string|null
}


