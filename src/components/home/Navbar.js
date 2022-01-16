import {Navbar,Container,Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../context/MyContext'

export default function NavBar(){
    const context = useContext(UserContext)
    const bg = {
        backgroundColor: 'red',/* For browsers that do not support gradients */
        backgroundImage: 'linear-gradient(45deg, rgb(156, 14, 156), midnightblue)'
    }

    return (
        <Navbar bg="dark" variant={"dark"} style={bg} sticky='top' expand="lg">
            <Container fluid >
                <Navbar.Brand as={Link} to='/'>ToDoAPP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    {context.data.isLogin ?<Nav.Link as={Link} to='/all'> All ToDo's</Nav.Link>:null} 
                    {context.data.isLogin ?<Nav.Link as={Link} to='/add'> Add ToDo</Nav.Link>:null} 
                    {context.data.isAdmin ?<Nav.Link as={Link} to='/admin'> Admin</Nav.Link> :null} 
                </Nav>

                <Nav>
                {context.data.isLogin ?<Nav.Link as={Link} to='/myaccount'> My Account</Nav.Link> :<Nav.Link as={Link} to='/register'> Register</Nav.Link>} 
                {context.data.isLogin ?<Nav.Link as={Link} to='/' onClick={context.logout}> Logout</Nav.Link> :<Nav.Link as={Link} to='/login'> Login</Nav.Link>} 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}