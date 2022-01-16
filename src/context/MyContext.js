import axios from "axios";
import react from "react";

const UserContext = react.createContext();

class UserContextProvider extends react.Component{
    constructor(props){
        super(props)
        this.state = {
            user: {  
                username:'',
                jwt:'',
                bearerToken:'',
                roles:[],
                userId:'',
                name:''
            },
            isLogin: false,
            isAdmin: false,
            loading:true
        }
    }

    setJwt = (newJwt) =>{
        console.log('NEW JWT')
        this.setState(prevState =>({
            isLogin: prevState.isLogin,
            isAdmin: prevState.isAdmin,
            loading:prevState.loading,
            user:{
                ...prevState.user,
                jwt:newJwt,
                bearerToken:'Bearer '+newJwt
            }
        }))
    }

    login = (data) =>{
        const user = {
            username:data.username,
            jwt: data.jwt,
            bearerToken: data.Bearer_token,
            roles:data.roles,
            userId:data.userID,
            name:data.name
        }
        localStorage.clear()
        localStorage.setItem('isLogin',true)
        let checkAdminRole = user.roles.includes('ROLE_ADMIN')
        this.setState({user:user,isLogin: true, isAdmin: checkAdminRole,loading:false})
    }

    logout = () =>{
        localStorage.clear()
        this.setState({user:{  
            username:'',
            jwt:'',
            bearerToken:'',
            roles:[],
            userId:'',
            name:''
        },isLogin: false,loading:false,isAdmin:false}) 
    }


    _getUserByRefreshToken(rTokent){
        axios.post('/api/auth/refresh',{refreshToken:rTokent},{headers:{'Content-Type':'application/json'},withCredentials:true})
        .then(response => {
            const data = response.data
            if(response.status === 200){
                axios.get(`/api/user/${data.userId}`,{headers:{'Content-Type':'application/json', 'Authorization':'Bearer '+data.jwt},withCredentials:true})
                .then(response2=>{
                  if(response2.status === 200){
                   const user = {
                        username:response2.data.email,
                        jwt:data.jwt,
                        bearerToken:'Bearer '+ data.jwt,
                        roles:response2.data.roles.map(r=>r.role),
                        userId:data.userId,
                        name:response2.data.name
                    }
                    let checkAdminRole = user.roles.includes('ROLE_ADMIN');
                    this.setState({user:user,isLogin:true,isAdmin:checkAdminRole,loading:false})
                  }
                })
                .catch(err=>console.log(err))
            }
        }).catch(err=>console.log(err))
    }

    componentDidMount(){
        const token = localStorage.getItem('isLogin')
        if(token === 'true'){
           this._getUserByRefreshToken(token)
        }else{
            this.setState({loading:false})
        }
    }

    render(){
        return(
            <UserContext.Provider value={{
                    data: this.state,
                    login: this.login,
                    logout: this.logout,
                    setJwt: this.setJwt
                }}>
                    {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserContext; 

export {UserContextProvider}