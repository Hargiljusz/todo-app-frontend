import jwtAxios from "../../utils/JWTAxios";
import React from "react";
import { Button,Container,Row } from "react-bootstrap";
import UserContext from "../../context/MyContext";
import ToDoItem from "./ToDoItem";

export default class ToDoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            startDate: this.props.startDate ? this.props.startDate :new Date().toISOString().substring(0,10),
            isOneDay: this.props.isOneDay,
            data:{},
            site:0,
            size:this.props.size ? this.props.size: 6,
            load: false
        }
    }

    getData = () =>{
        let URL =  `/api/todo/today?page=${this.state.site}&size=${this.state.size}`
        jwtAxios.get(
            URL,
            {headers:{'Content-Type':'application/json'},context:this.context})
        .then(response =>{
            this.setState({data:response.data,load:false})
        })
        .catch(err => console.log(err))  
    }

    increment = () =>{
        this.setState({site:this.state.site + 1 })
    }
    decrement =() =>{
        this.setState({site:this.state.site - 1 })
    }

    componentDidMount(){
        this.getData()
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.site !== prevState.site && !this.state.load){
            this.setState({load:true})
            this.getData()
        }
    }

    _mapToToDoItem = (content) =>{
        return content.map(p=>{return <ToDoItem key={p.id} toDoItem={p} refreshContent={this.refreshContent}/>})
     }

     _sliceArray = (arr)=>{
        const addRow = arr.length % 3 > 0 ? 1: 0
        const countRows = arr.length / 3 + addRow
        const resultArr = [];
        for (let i = 0; i < countRows; i++) {
            const tempChunk = arr.slice(0+3*i,3+3*i)
            resultArr.push(
                <Row key = {i}  className="justify-content-md-center "> 
                    {tempChunk}
                </Row>
            )
        }
        return resultArr
     }

     refreshContent = () =>{
         console.log('FETCH')
         this.setState({site:0})
         this.getData()
     }



    render(){
        if(this.state.data.toDoItemList && !this.state.load){
            if(this.state.data.toDoItemList.length > 0){
                const itemList = this._mapToToDoItem(this.state.data.toDoItemList)
                const rowToDoItem = this._sliceArray(itemList)
                 return(
                     <div>
                         <Container>
                                 {rowToDoItem}
                                 <hr className="mt-2"/>  
                                 <div >
                                 {0 === this.state.site ? <Button disabled={true}>Prev</Button>:<Button onClick={this.decrement}>Prev</Button>}
                                 <span className="m-2">{this.state.site+1}</span>
                                 {!this.state.data.next ? <Button disabled={true}>Next</Button>:<Button onClick={this.increment}>Next</Button>}
                                 </div>
                         </Container>
                     </div>
                 ) 
            }
            return(<div>ToDoItems Not Found</div>)
           
        }
        return (<div>Fetching data ...</div>)
        
    }
}

ToDoList.contextType = UserContext