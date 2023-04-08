import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import './NavBar.css';
import { useContext } from "react";
import { GlobalContext } from '../App/App';

export const NavBar = () => {
  const navigate = useNavigate();

  const { loginUser, setLoginUser } = useContext(GlobalContext);

  const userLogout = () => {
    setLoginUser({})
    navigate('/')
    window.location.reload(false)
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">MY Inventory Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {loginUser.username ? 
              <div className="userLogin"><span className="welcomeText">Welcome {loginUser.first_name}</span><Button variant='secondary' onClick={() => userLogout()}>Logout</Button></div> :
              <div>
                <a className="formLink" href="/Create-Account">Create an account</a>{`' ' ' '`}
                <Button variant='secondary' onClick={() => navigate('/Login')}>Login</Button>
              </div>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}