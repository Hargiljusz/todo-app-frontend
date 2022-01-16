import React from "react";
import { Form, Container,Button,Row } from "react-bootstrap";
import UserContext from "../../context/MyContext";
import jwtAxios from "../../utils/JWTAxios";
import { Navigate } from "react-router-dom";


export default class ToDoForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            note:'',
            rgbColorBackground:'#ffffff',
            rgbColorText:'#000000',
            startDate:new Date().toISOString().substring(0,10),
            endDate:'',
            isOneDay:'false',
            isSended:false
        }
    }

    handleSubmit = (event)=>{

        event.preventDefault();
        if(this.state.isOneDay === 'false' && this.state.endDate === ''){
            alert('Set End Date or check Is One Day')
        }else{
            const data = {
            title: this.state.title,   
            note: this.state.note,
            rgbColorBackground: this.state.rgbColorBackground,
            rgbColorText:this.state.rgbColorText,
            startDate:this.state.startDate,
            endDate:  this.state.isOneDay === 'true' ? this.state.startDate: this.state.endDate,
            oneDay: this.state.isOneDay === 'true'   
            }
            //console.log(data)
            jwtAxios.post('/api/todo/',data,{context:this.context})
            .then(r=>this.setState({isSended:true}))
            .catch(err=>console.log(err))
        }
        
    }

    handleInputChange = (event) =>{
        const target = event.target
        const name = target.name
        const value = target.value
        if(name != 'isOneDay'){
            this.setState({
                [name]: value
            })
        }else{
            this.setState({
                isOneDay: value === 'true' ? 'false': 'true'
            }) 
        }
    }


    render(){
        if(this.state.isSended){
            return(<Navigate to='/'/>)
        }else{
            return(
                <Container>
                    <Row className="justify-content-md-center">
                     <Form onSubmit={this.handleSubmit} className="w-25">
                        <Form.Group className="mb-3" controlId="exampleForm.title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control  name="title" placeholder="Title" onChange={this.handleInputChange} value={this.state.title}/>
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" name="note" rows={3} placeholder="Note..." onChange={this.handleInputChange} value={this.state.note}/>
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="exampleForm.colorbg">
                            <Form.Label>BackGroundColor</Form.Label>
                            <Form.Control type="color" name="rgbColorBackground" onChange={this.handleInputChange} value={this.state.rgbColorBackground}/>
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="exampleForm.colortxt">
                            <Form.Label>TextColor</Form.Label>
                            <Form.Control type="color" name="rgbColorText" onChange={this.handleInputChange} value={this.state.rgbColorText} />
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="exampleForm.startDae">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="startDate"  onChange={this.handleInputChange} value={this.state.startDate}/>
                        </Form.Group>
        
        
                        <hr />
                        <Form.Group className="mb-3" controlId="isOneDay">
                            <Form.Check type="checkbox" label="Is One Day?" name="isOneDay" onChange={this.handleInputChange} value={this.state.isOneDay} />
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="exampleForm.enDate">
                            <Form.Label>End Date</Form.Label>
        
                            {this.state.isOneDay === 'true' ? 
                            <Form.Control type="date" name="endDate" onChange={this.handleInputChange} value={this.state.endDate} disabled/>
                            :
                            <Form.Control type="date" name="endDate" onChange={this.handleInputChange} value={this.state.endDate} />}
                            
                        </Form.Group>
        
        
                        <Button variant="secondary" type="submit">
                            Submit
                        </Button>
                     </Form>
                     </Row>
                </Container>
                )
        }
        
    }
} 

ToDoForm.contextType = UserContext
