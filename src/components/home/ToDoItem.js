import { Card,Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import jwtAxios from "../../utils/JWTAxios";
import UserContext from "../../context/MyContext";


export default class ToDoItem extends React.Component{


    delete = ()=>{
        jwtAxios.delete(`/api/todo/?id=${this.props.toDoItem.id}&userId=${this.context.data.user.userId}`,{context:this.context})
        .then(r=>{
            this.props.refreshContent()
        })
        .catch(err=>console.log(err))
    }


    render(){
        const {title,note,rgbColorBackground,rgbColorText,startDate,endDate} = this.props.toDoItem;
        return(
            <Card style={{ width: '18rem',backgroundColor:rgbColorBackground,color:rgbColorText }} className="m-3">
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
               {note}
              </Card.Text>
                <footer className="blockquote-footer" style={{color:rgbColorText}}>
                    <span>{startDate}</span>
                    <span> --</span>
                    <span> {endDate}</span>
                    {this.context.data.isAdmin ? 
                    <Link to={`/edit/${this.props.toDoItem.id}`}>
                        <Button className="mx-2 mt-1 border border-dark " variant="outline-dark">SHOW ID</Button>
                    </Link>
                    :
                    null}
                        <Button className="mx-2 mt-1 border border-dark" variant="danger" onClick={this.delete}>Delete</Button>
                </footer> 
            </Card.Body>
          </Card>
        )
    }
}

ToDoItem.contextType = UserContext