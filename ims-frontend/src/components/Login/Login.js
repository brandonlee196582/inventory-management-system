import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { GlobalContext } from '../App/App';
const bcrypt = require('bcryptjs');

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser, setLoginUser } = useContext(GlobalContext);

  const [username, setUsername] = useState();
  const [loginFail, setLoginFail] = useState();

  const login = () => {
    loginUser.failed ? setLoginFail(
      <div className='loginFail'>
        Login Failed
        <Button variant="secondary" onClick={() => setLoginFail('')}>Try Again</Button>
      </div>
    ) : navigate('/')
  }

  const setPassword = (password) => {
      fetch("http://localhost:3001/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": username})
      }).then(res => res.json())
        .then(data => {
          bcrypt.compare(password, data.password, (err, result) => {
            if (result) {
              setLoginUser({first_name: data.first_name, last_name: data.last_name, username: data.username})
            } else {
              setLoginUser({failed: true})
            }
          });
        })
  }

  const usernameChange = (username) => {
    document.getElementById('formBasicPassword').value = '';
    setLoginUser(false)
    setUsername(username)
  }

  return(
    <div className='loginDiv'>
      {loginFail}
      <Form>
        <Form.Group className="mb-3 mt-4 formTextBox">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={(event) => usernameChange(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3 formTextBox" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onBlur={(event) => setPassword(event.target.value)} />
        </Form.Group>
        <div className="formTextBox">
          <Form.Text className='newHereText' href="/">
            New Here? <a className="formLink" href="/Create-Account">Click Here to create an account.</a>
          </Form.Text>
          <br/>
          <Button className="formButton" variant="secondary" onMouseOver={(event) =>  event.target.focus()} onClick={() => login()}>Submit</Button>
          <Button className="formButton" variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </Form>
    </div>
  )
}