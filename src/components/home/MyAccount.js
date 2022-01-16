import { useEffect,useContext,useState } from "react"
import UserContext from "../../context/MyContext"
import jwtAxios from "../../utils/JWTAxios"
import { Button } from "react-bootstrap"


export default  function MyAccount(){
    const context = useContext(UserContext)
    const [data,setData] = useState({
        email:'',
        surname:'',
        name:'',
        roles:[]
    })

    useEffect(()=>{
        jwtAxios.get(`/api/user/${context.data.user.userId}`,{context:context})
        .then(r=>{
            setData(r.data)
            console.log(r.data)
        })
        .catch(err=>console.log(err))
    },[])

    return(
        <div>
            <h1>My Account:</h1>
            <hr/>
            <ul>
                <li>E-mail: {data.email}</li>
                <li>Name: {data.name}</li>
                <li>Surename: {data.surname}</li>
            </ul>
            <h4 >Roles:</h4>
            <ul>
                {data.roles.length >0 ? 
                data.roles.map(r=>{return<li key={r.id}>{r.role}</li>}):
                null}
            </ul>
            <hr />
            <Button variant="outline-success" className="mx-2" disabled>Edit</Button>
            <Button variant="danger" className="mx-2" disabled>
                Delete
            </Button>
        </div>
    )
}