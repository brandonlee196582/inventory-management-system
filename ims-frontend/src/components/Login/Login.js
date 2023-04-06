import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'

export const Login = () => {
  const navigate = useNavigate();
  return(
    <div className='loginDiv'>
      <Form>
        <Form.Group className="mb-3 mt-4 formTextBox">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3 formTextBox" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div className="formTextBox">
          <Form.Text href="/">
            New Here? <a className="formLink" href="/Create-Account">Click Here to create an account.</a>
          </Form.Text>
          <br/>
          <Button className="formButton" variant="secondary" type="submit">Submit</Button>
          <Button className="formButton" variant="secondary" type="submit" onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </Form>
    </div>
  )
}