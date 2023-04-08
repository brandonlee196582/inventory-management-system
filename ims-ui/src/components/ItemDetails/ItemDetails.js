import { GlobalContext } from '../App/App'
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import './ItemDetails.css'

export const ItemDetails = () => {
  const navigate = useNavigate();
  const { loginUser, users, setUsers } = useContext(GlobalContext);
  const [item, setItem] = useState({});
  const [editItem, setEditItem] = useState(false);
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerId, setManagerId] = useState('');

  useEffect(() => {
    const urlArray = window.location.href.split('/')
    const itemNum = urlArray[urlArray.length - 1]
    fetch(`http://localhost:3001/item/${itemNum}`)
      .then(response => response.json())
      .then(data => {
        setItem(data[0])
      })
    fetch('http://localhost:3001/user')
      .then(response => response.json())
      .then(data => setUsers(data))
  },[])

  useEffect(() => {
    if (users.length > 0) {
      if (item.item_name) {
        const userMatch = users.find(user => `${item.user_id}` === `${user.id}`)
        setManagerName(userMatch.username)
        setManagerId(item.user_id)
        setName(item.item_name)
        setDesc(item.description)
        setQty(item.quantity)
      }
    }
  },[users, item])

  const setUserValues = (userIdString) => {
    const userArr = userIdString.split('~')
    setManagerId(userArr[0])
    setManagerName(userArr[1])
  }

  const modifyItem = () => {
    fetch(`http://localhost:3001/item/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: managerId, item_name: name, description: desc, quantity: qty}),
      })
    setEditItem(false)
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

  const editButtonSetup = () => {
    if (editItem) {
      return(
        <>
          <Button variant='success' className='detailButton' onClick={() => modifyItem()}>Save</Button>
        </>
      )
    } else {
      return (
        loginUser.first_name ? 
        <Button variant='info' className='detailButton' onClick={() => {
          setEditItem(true)
          setDesc(desc)
          setName(name)
          var userMatch = users.find(user => `${user.id}` === `${managerId}`)
          setManagerId(managerId)
          setManagerName(userMatch.username)
          setQty(qty)}}>
          Edit Item
        </Button> : ''
      )
    }
  }

  return(
    <div>
      <br/>
      <NavBar />
      <div className='container itemDetails'>
      {item.item_name ? 
        <div>
          <h3 style={{textAlign: "center"}}>{name.length > 29 ? `${name.substring(0,29)}...` : name} Details</h3>
          <br/>
          <h5 className='detailLabel'>ID Number:</h5><span> {item.id}</span>
          <br/>
          <br/>
          <h5 className='detailLabel'>Manager ID:</h5><span> {managerId}</span>
          <br/>
          <br/>
          {editItem ?
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
            </div> :
            <div className='managerDiv'>
              <h5 className='detailLabel'>Manager Username:</h5>
              <br/>
              <h4> {managerName}</h4>
            </div>}
          <br/>
          <div className='nameDiv'>
          <h5 className='detailLabel'>Name:</h5>{editItem ? 
            <Form>
              <Form.Group>
                <Form.Control type="text" onChange={(event) => setName(event.target.value)} value={name}/>
              </Form.Group>
            </Form> :
            <><br/><h4> {name}</h4></>}
          </div>
          <br/>
          <div className='descAreaDiv'>
            <h5 className='detailLabel'>Full Description:</h5>
            <div className='descriptionDiv'>
              {editItem ? 
                <Form>
                  <Form.Group>
                    <Form.Control id='descBox' className="descBox" as="textarea" rows={3} placeholder={item.description} onChange={(event) => setDesc(event.target.value)} value={desc} />
                  </Form.Group>
                </Form> :
                <>
                  <p> {desc}</p>
                </>}
            </div>
          </div>
          <br/>
          <br/>
          {editItem ? 
          <div className='qtyDiv'>
            <h5 className='detailLabel'>Stock Quantity:{' '}</h5>
            {' '}
            <br/>
            <div className='numCounterDiv'>
              <button className='controlBtn controlBtnMinus' type='button' onClick={() => setQty(parseInt(qty) - 1)}>-</button>
              <span className='numSpace'>{qty}</span>
              <button className='controlBtn controlBtnPlus' type='button' onClick={() => setQty(parseInt(qty) + 1)}>+</button>
            </div>
          </div> :
          <div className='qtyDiv'>
            <h5 className='detailLabel'>Stock Quantity:</h5>
            <br/>
            <span> {qty}</span>
          </div>}
          <br/>
          <br/>
          <Button variant='secondary' className='detailButton' onClick={() => navigate('/')}>Return to List</Button>
          {editItem ? <Button variant='secondary' className='detailButton' onClick={() => setEditItem(false)}>Cancel</Button> : ''}
          {editButtonSetup()}
        </div> :
        ''
      }
      </div>
    </div>
  )
}