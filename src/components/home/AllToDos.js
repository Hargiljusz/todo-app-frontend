import jwtAxios from '../../utils/JWTAxios'
import React from 'react'
import UserContext from '../../context/MyContext'
import { Container, Form,Button,Row } from 'react-bootstrap'
import ToDoItem from './ToDoItem'

export default class AllToDos extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            startDate:new Date().toISOString().substring(0,10),
            endDate:new Date().toISOString().substring(0,10),
            site:0,
            size:this.props.size ? this.props.size: 6,
            load: false,
            data:{}
        }
    }

    increment = () =>{
        this.setState({site:this.state.site + 1 })
    }
    decrement =() =>{
        this.setState({site:this.state.site - 1 })
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

    handleInputChange =(event)=>{
        event.preventDefault()
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
                [name]: value
            })
           
    }
    handleSubmit = (event) =>{
        event.preventDefault()
        const sD = new Date(this.state.startDate)
        const eD = new Date(this.state.endDate)
        //console.log(sD.getTime()+' '+eD.getTime())
        if(eD.getTime() >= sD.getTime()){
           this.getData()
        }else{
            alert('The Start date must be earlier or equal to than the end date')
        }
        
    }

    getData(){
        let URL =  `/api/todo/range?page=${this.state.site}&size=${this.state.size}&start=${this.state.startDate}&end=${this.state.endDate}`
        jwtAxios.get(
            URL,
            {headers:{'Content-Type':'application/json'},context:this.context})
        .then(response =>{
            this.setState({data:response.data,load:false})
           // console.log(response.data)
        })
        .catch(err => console.log(err))  
    }

    _toDoItemList=()=>{
        if(this.state.data.toDoItemList && !this.state.load){
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
    }

    render(){
        return(
            <Container>
                <Form className='w-50 mx-auto' onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Start Date:</Form.Label>
                        <Form.Control name='startDate' type='date' value={this.state.startDate} onChange={this.handleInputChange}/>
                    </Form.Group>
        
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">End Date:</Form.Label>
                        <Form.Control name='endDate' type='date' value={this.state.endDate} onChange={this.handleInputChange}/>
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                            Submit
                        </Button>
                </Form>
                <hr />
                {this._toDoItemList()}
            </Container>
            
            )
    }
}

AllToDos.contextType = UserContext