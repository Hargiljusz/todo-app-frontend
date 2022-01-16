import { useContext } from "react";
import { Navigate } from "react-router";
import UserContext from "../context/MyContext";
import AccessDenied from "../components/auth/AccesDennided";

export default function PrivateRoutes({CustomComponent,roles}) {
  
        const context = useContext(UserContext)
        const isLogin = context.data.isLogin
        const hasRole = roles&& context.data.user.roles.some(r => roles.includes(r))

        if(context.data.loading){
              return null  
        }else{
                if(isLogin && !roles){
                        return(<CustomComponent />)
                }else if(isLogin && roles && hasRole){
                        return(<CustomComponent />)   
                }else if (isLogin && roles && !hasRole){
                        return(<AccessDenied />)
                }else{
                        return <Navigate to='/'/>
                }
        }
}