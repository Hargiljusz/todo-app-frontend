import axios from "axios";

const jwtAxios = axios.create()

jwtAxios.interceptors.request.use(config =>{
    const {context} = config;
    config.headers.Authorization = context.data.user.bearerToken
    config.again = true
    config.withCredentials = true
    return config
},
 error =>{
     return Promise.reject(error)
 }
)


jwtAxios.interceptors.response.use(
    httpObject =>{
        return httpObject
    },
    error => {
        const originalRequest = error.config
        if(error.response && error.response.status === 401 && originalRequest.again){

            const {context} = originalRequest

            return axios.post('/api/auth/refresh',{headers:{'Content-Type':'application/json'},withCredentials:true})
                        .then(r=>{
                            context.setJwt(r.data.jwt)
                            originalRequest.headers.Authorization ='Bearer '+r.data.jwt
                            originalRequest.again = false
                            return axios(originalRequest)
                        })
                        .catch(err=>{
                            context.logout()
                            return Promise.reject(err)
                        })
            
        }else{
            return Promise.reject(error);
        }
           
     

    }
)

export default jwtAxios;