import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            name: '',
            surname: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            redirect:false
        }
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
        event.preventDefault();
        if(this.state.password === this.state.confirmPassword && this.state.password !== ''){
            this.singUp();
            console.log('Udalo sie')
        }else if(this.state.password !== this.state.confirmPassword && this.state.password !== ''){
            alert('Error! Confirm Password Not Match')
            console.log('Nie udalo sie')
        }else{
            alert('Enter Password')
            console.log('Nie udalo sie')
        }
      }

      singUp=()=>{
        const userRegister ={
            email:this.state.email,
            name:this.state.name,
            surname:this.state.surname,
            phoneNumber:this.state.phoneNumber,
            password:this.state.password,
            confirmPassword:this.confirmPassword
        };
        axios.post('/api/auth/singUp',userRegister,{headers:{'Content-Type':'application/json'}})
        .then(response => {
            this.setState({redirect:true})
        })
        .catch(err=>alert('Wrong data'))
      }

      render(){
            const {redirect} = this.state;

            if(redirect){
                return(<Navigate to="/login"/>)
            }
            return(
                <div className="w-50 mx-auto">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Email" onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Name" onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="surename">
                            <Form.Label>Surename</Form.Label>
                            <Form.Control type="text" name="surename" placeholder="Surname" onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phonenumber">
                            <Form.Label>Phonenumber</Form.Label>
                            <Form.Control type="text" name="phonenumber" placeholder="Phonenumber" onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleInputChange}/>
                        </Form.Group>

                        <Button variant="secondary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </div>
            )
      }
}