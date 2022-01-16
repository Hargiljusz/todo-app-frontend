import React,{Component} from "react";
import axios from "axios";
import UserContext from '../../context/MyContext'
import { Form,Button } from "react-bootstrap";
import {Link, Navigate} from "react-router-dom"

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {email:'',password:'',redirect:false}
    }

    handleInputChange = (event)=>{
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({
            [name]: value
        })
    }

    handleSubmit =(event) =>{
        //console.log(this.state)
        this.singIn()
        event.preventDefault();
      }

    singIn = () =>{
        axios.post('/api/auth/singIn',{email:this.state.email,password:this.state.password},{headers:{'Content-Type':'application/json'}})
        .then(response => {
            if(response.status === 200){
                this.context.login(response.data)
                console.log(response.data)
                this.setState({redirect:true})
            }else{
                alert("Wrong Credentials")
            }
            
        })
        .catch(err=>{alert('OOPS SOMETHING WENT WRONG') 
        console.log(err)})
    }

    render(){
        
        const {redirect} = this.state;

        if(redirect){
            return(<Navigate to="/"/>)
        }
        return(
            <div style={{width: 700,padding: 30,marginLeft:'auto',marginRight:'auto' }}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Link  to="/register">Register</Link>
           
            </div>
        )
    }
}

Login.contextType = UserContext

export default Login;