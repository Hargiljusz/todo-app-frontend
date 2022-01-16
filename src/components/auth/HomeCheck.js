import { useContext } from "react";
import UserContext from '../../context/MyContext'
import Hello from '../home/Home'
import HomeIsLogin from "../home/HomeIsLogin";
import ToDoList from "../home/ToDoList";

export default function HomeCheck(){
    const context = useContext(UserContext)
    return(
        <div>
            {context.data.isLogin ? <div><HomeIsLogin/><hr /> <ToDoList/></div> : <Hello /> }
        </div>
    )

}