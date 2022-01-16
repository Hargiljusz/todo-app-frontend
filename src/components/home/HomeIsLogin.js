import { useContext } from "react"
import UserContext from "../../context/MyContext"

export default function HomeIsLogin(){
    const context = useContext(UserContext)
    return(
        <div>
           HI: {context.data.user.name} !
        </div>
    )
}