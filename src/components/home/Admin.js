import jwtAxios from '../../utils/JWTAxios'
import { useEffect,useState,useContext } from 'react'
import UserContext from '../../context/MyContext'
import { Form } from 'react-bootstrap'

export default function Admin(){
const context = useContext(UserContext)
    const [data,setData] = useState({})

    useEffect(()=>{
        jwtAxios.get('/api/admin/stats',{context:context})
        .then(r=>{
            setData(r.data)
        })
        .catch(err=>console.log(err))
    },[])

    return(
        <div>
            <h1>ADMIN SITE:</h1>
            <hr/>
            <h2>YOUR JWT:</h2>
            <span style={{wordWrap:'break-word'}} >{context.data.user.jwt}</span>
            <hr />
            <h3>Number of Beans(Spring - Backend): {data.numberOfBeans}</h3>
            <h3>Number of Users in mongoDB: {data.numberOfUsers}</h3>
            <h3>Number of ToDoItems in MongoDB: {data.numberOfToDos}</h3>
            <h3>JWT Exp Time: {data.jwtTime}s</h3>
            <h3>Refresh Token Exp Time {data.refreshTokenTime/(60*60*24)}days</h3>
        </div>
    )
}