import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AccountCreate.css'
import { useState } from "react";
const bcrypt = require('bcryptjs');
const saltRounds = 10;

export const AccountCreate = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [usernameCkText, setUsernameCkText] = useState('');
  const [passwordCkText, setPasswordCkText] = useState('');
  const [missingFirstText, setMissingFirstText] = useState('');
  const [missingLastText, setMissingLastText] = useState('');
  const [missingUserText, setMissingUserText] = useState('');
  const [missingPassText, setMissingPassText] = useState('');
  const [missingPassCkText, setMissingPassCkText] = useState('');

  const createUser = async () => {
    var errCount = 0;
    if (document.getElementById('formPassword').value !== document.getElementById('formCkPassword').value) {
      errCount++;
      setPasswordCkText(<span className="errText">!! Passwords don't match !!</span>)
    } else {
      setPasswordCkText('')
    }
    if (!firstName) {
      errCount++;
      setMissingFirstText(<span className="errText">!! Missing First Name !!</span>)
    } else {
      setMissingFirstText('');
    }
    if (!lastName) {
      errCount++;
      setMissingLastText(<span className="errText">!! Missing Last Name !!</span>)
    } else {
      setMissingLastText('');
    }
    if (!username) {
      errCount++;
      setMissingUserText(<span className="errText">!! Missing Username !!</span>)
    } else {
      setMissingUserText('');
      await fetch("http://localhost:3001/Username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": username})
      }).then(res => res.json())
        .then(data => {
          if (!data.avaliable) {
            errCount++;
            setUsernameCkText(<span className="errText">!! Username Not Avaliable !!</span>)
          } else {
            setUsernameCkText('')
          }
        });
    }
    if (!document.getElementById('formPassword').value) {
      errCount++;
      setMissingPassText(<span className="errText">!! Missing Password !!</span>)
    } else {
      setMissingPassText('')
    }
    if (!document.getElementById('formCkPassword').value) {
      errCount++;
      setMissingPassCkText(<span className="errText">!! Missing Password !!</span>)
    } else {
      setMissingPassCkText('')
    }
    if (errCount < 1) {
      await bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(document.getElementById('formPassword').value, salt, (err, hash) => {
          fetch("http://localhost:3001/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({first_name: firstName, last_name: lastName, username: username, password: hash})
          }).then(res => res.json())
            .then(data => {
              if (!data.avaliable) {
                errCount++;
                setUsernameCkText(<span className="errText">!! Username Not Avaliable !!</span>)
              } else {
                setUsernameCkText('')
              }
            });
        })
      })
      navigate('/Login')
    }
  }

  return(
    <div className='loginDivC'>
      <Form>
        <Form.Group className="mb-3 mt-4 formTextBox">
          <Form.Label>First Name {missingFirstText}</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" onChange={(event) => setFirstName(event.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3 mt-4 formTextBox">
          <Form.Label>Last Name {missingLastText}</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" onChange={(event) => setLastName(event.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3 mt-4 formTextBox">
          <Form.Label>Username {usernameCkText} {missingUserText}</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={(event) => setUsername(event.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3 formTextBox" controlId="formPassword">
          <Form.Label>Password {passwordCkText} {missingPassText}</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3 formTextBox" controlId="formCkPassword">
          <Form.Label>Confirm Password {passwordCkText} {missingPassCkText}</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div className="formTextBox">
          <Button className="formButton" variant="secondary" onClick={() => createUser()}>Submit</Button>
          <Button className="formButton" variant="secondary" onClick={() => navigate('/Login')}>Cancel</Button>
        </div>
      </Form>
    </div>
  )
}