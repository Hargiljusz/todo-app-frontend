import './App.css';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {UserContextProvider} from './context/MyContext'
import HomeCheck from './components/auth/HomeCheck';
import NavBar from './components/home/Navbar';
import {Container} from 'react-bootstrap'
import ToDoForm from './components/home/ToDoForm';
import PrivateRoutes from './routes/PrivateRoutes';
import Admin from './components/home/Admin'
import ShowToDoId from './components/home/ShowToDoId';
import MyAccount from './components/home/MyAccount';
import AllToDos from './components/home/AllToDos';
import Register from './components/auth/Register';

function App() {
  const mainStyle ={
    backgroundColor:"rgb(163, 163, 194)",
    marginTop: "20px",
    border: '1px solid #000',
    minHeight: '1300px',
    borderRadius: '45px',
    padding: '10px',
    paddingTop: '20px'
  }
  console.log("TEST")
  
  return (
    <div className="App" >
      <Router>    
        <UserContextProvider>
            <NavBar/>
            <Container style={mainStyle}>
              <Routes>
                <Route path="/" element={<HomeCheck />}/>
                <Route path="add" element={<PrivateRoutes CustomComponent={ToDoForm}/>}/>
                <Route path="edit/:id" element={<PrivateRoutes CustomComponent={ShowToDoId}/>}/>
                <Route path='myaccount' element={<PrivateRoutes CustomComponent={MyAccount}/>}/>
                <Route path='all' element={<PrivateRoutes CustomComponent={AllToDos}/>}/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route path='admin' element={<PrivateRoutes CustomComponent={Admin} roles={['ROLE_ADMIN']}/>} />
              </Routes>
            </Container>
        </UserContextProvider>
      </Router>
    </div> 
  );
}

export default App;