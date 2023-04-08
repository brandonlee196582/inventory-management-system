import { GlobalContext } from '../App/App'
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import './AddItem.css'

export const AddItem = () => {
  const navigate = useNavigate();
  const { loginUser, setAllItems, users, setUsers } = useContext(GlobalContext);
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);
  const [managerName, setManagerName] = useState('');
  const [managerId, setManagerId] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [descErr, setDescErr] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/user')
      .then(response => response.json())
      .then(data => setUsers(data))
  },[])

  useEffect(() => {
    if (users.length > 1) {
      const userMatch = users.find(user => user.username === loginUser.username)
      setManagerId(userMatch.id)
      setManagerName(userMatch.username)
    }
  },[users, loginUser])

  const setUserValues = (userIdString) => {
    const userArr = userIdString.split('~')
    setManagerId(userArr[0])
    setManagerName(userArr[1])
  }

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            variant="dark"
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(event) => {
              setValue(event.target.value)
            }}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  const saveItem = () => {
    var errCount = 0;
    if (name === '') {
      errCount++
      setNameErr(<span className='errText'> !! Missing Item Name !!</span>)
    } else {
      setNameErr('')
    }
    if (desc === '') {
      errCount++
      setDescErr(<span className='errText'> !! Missing Item Description !!</span>)
    } else {
      setDescErr('')
    }
    if (errCount < 1) {
      fetch("http://localhost:3001/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: managerId, item_name: name, description: desc, quantity: qty})
      }).then(res => res)
      .then(data => {
        fetch('http://localhost:3001/item')
          .then(response => response.json())
          .then(data => setAllItems(data))
      })
      navigate('/')

    }
  }

  return(
    <div>
      <br/>
      <NavBar />
      <div className='container itemDetailsAdd'>
      {loginUser.first_name ? 
        <div>
          <h3 style={{textAlign: "center"}}>Add Item</h3>
          <br/>
          <h5 className='detailLabel'>Manager ID:</h5><span> {managerId}</span>
          <br/>
          <br/>
          {
            <div className='managerDiv'>
              <h5 className='detailLabel'>Manager Username:</h5>
              <Dropdown>
                <Dropdown.Toggle className="dropdownMenu" variant="secondary" id="dropdown-basic">
                  {managerName}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark" as={CustomMenu} className='dropdownDiv'>
                  {users.map((user,i) => {
                    return(<Dropdown.Item id={`${user.id}~${user.username}`} className="dropdownItem" key={i} onClick={((event) => setUserValues(event.target.id))}>{user.username}</Dropdown.Item>)
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          }
          <br/>
          <div className='nameDiv'>
          <h5 className='detailLabel'>Name:</h5>{nameErr}
          {
            <Form>
              <Form.Group>
                <Form.Control type="text" onChange={(event) => setName(event.target.value)} value={name}/>
              </Form.Group>
            </Form>
          }
          </div>
          <br/>
          <div className='descAreaDiv'>
            <h5 className='detailLabel'>Full Description:</h5>{descErr}
            <div className='descriptionDiv'>
              {
                <Form>
                  <Form.Group>
                    <Form.Control id='descBox' className="descBox" as="textarea" rows={3} onChange={(event) => setDesc(event.target.value)} value={desc} />
                  </Form.Group>
                </Form>
              }
            </div>
          </div>
          <br/>
          <br/>
          {
            <div className='qtyDiv'>
              <h5 className='detailLabel'>Stock Quantity:{' '}</h5>
              {' '}
              <br/>
              <div className='numCounterDiv'>
                <button className='controlBtn controlBtnMinus' type='button' onClick={() => setQty(parseInt(qty) - 1)}>-</button>
                <span className='numSpace'>{qty}</span>
                <button className='controlBtn controlBtnPlus' type='button' onClick={() => setQty(parseInt(qty) + 1)}>+</button>
              </div>
            </div>
          }
          <br/>
          <br/>
          <Button variant='secondary' className='detailButton' onClick={() => navigate('/')}>Cancel</Button>
          <Button variant='success' className='detailButton' onClick={() => saveItem()}>Save</Button>
        </div> :
        ''
      }
      </div>
    </div>
  )
}