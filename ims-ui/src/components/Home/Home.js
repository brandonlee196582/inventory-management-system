import { NavBar } from "../NavBar/NavBar"
import { GlobalContext } from '../App/App'
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import './Home.css'

export const Home = () => {
  const { loginUser, allItems, setAllItems, users, setUsers } = useContext(GlobalContext);
  const allItemsText = (
    <>
      <span>You are currently viewing all items. </span><br/>
      {loginUser.first_name ? <Button variant='secondary' className="m-1" onClick={() => clearFilter('user')}>Return to your items</Button> : ''}
    </>
  )
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [manager, setManager] = useState('A~Manager');
  const [filtered, setFiltered] = useState(allItemsText);
  const [descFilter, setDescFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const filterItemsText = (
    <>
      <span>Your results are filtered. </span><br/>
      <Button className="m-1" variant='secondary' onClick={() => clearFilter()}>Clear Filter</Button>
      {loginUser.first_name ? <Button className="m-1" variant='secondary' onClick={() => clearFilter('user')}>Return to your items</Button> : ''}
    </>
  )
  const filterLoginText = (
    <>
      <span>Your results are filtered to your items. </span><br/>
      <Button className="m-1" variant='success' onClick={() => navigate('/add-item')}>Add Item</Button>
      <Button className="m-1" variant='secondary' onClick={() => clearFilter('all')}>See All Items</Button>
    </>
  )

  const managerChange = (userIdString) => {
    const userIdArr = userIdString.split('~');
    var filteredItems = [];
    setManager(userIdString)

    if (userIdArr[0] === 'A') {
      filteredItems = allItems
    } else {
      filteredItems = allItems.filter(item => `${item.user_id}` === `${userIdArr[0]}`)
    }
    if (descFilter !== '') {
      filteredItems = filteredItems.filter(item => item.description.toLowerCase().match(descFilter.toLowerCase()))
    }
    if (nameFilter !== '') {
      filteredItems = filteredItems.filter(item => item.item_name.toLowerCase().match(nameFilter.toLowerCase()))
    }
    if (descFilter === '' && userIdArr[0] === 'A' && nameFilter === '') {
      clearFilter()
    } else {
      setFiltered(filterItemsText)
    }
    setItems(filteredItems)
  }

  useEffect(() => {
    fetch('http://localhost:3001/item')
      .then(response => response.json())
      .then(data => {
        setItems(data)
        setAllItems(data)
      })
    fetch('http://localhost:3001/user')
      .then(response => response.json())
      .then(data => setUsers(data))
  },[])

  useEffect(() => {
    if (allItems.length > 1) {
      if (users.length > 1) {
        if (loginUser.first_name) {
          const userMatch = users.find(user => user.username === loginUser.username)
          managerChange(`${userMatch.id}~${loginUser.username}`)
          setFiltered(filterLoginText)
        }
      }
    }
  },[users, allItems])

  const getUsername = (id) => {
    if (users.length > 0) {
      const userMatch = users.find(user => `${user.id}` === `${id}`)
      return(userMatch.username)
    } else {
      return('')
    }
  }

  const getDescription = (description) => {
    var outString;
    if (description.length > 100) {
      outString = description.substring(0,100) + '...'
    } else {
      outString = description
    }
    return(outString)
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

  const clearFilter = (clearItems) => {
    if (loginUser.first_name) {
      if (clearItems === 'all') {
        setDescFilter('');
        setNameFilter('');
        setItems(allItems);
        setFiltered(allItemsText);
        setManager('A~Manager');
        document.getElementById('nameFilterBox').value = '';
        document.getElementById('descFilterBox').value = '';
      } else if (clearItems === 'user') {
        setDescFilter('');
        setNameFilter('');
        setItems(allItems);
        setFiltered(allItemsText);
        setManager('A~Manager');
        document.getElementById('nameFilterBox').value = '';
        document.getElementById('descFilterBox').value = '';
        const userMatch = users.find(user => user.username === loginUser.username)
        managerChange(`${userMatch.id}~${loginUser.username}`)
        setFiltered(filterLoginText)
      } else {
        setDescFilter('');
        setNameFilter('');
        setItems(allItems);
        setFiltered(allItemsText);
        setManager('A~Manager');
        document.getElementById('nameFilterBox').value = '';
        document.getElementById('descFilterBox').value = '';
      }
    } else {
      setDescFilter('');
      setNameFilter('');
      setItems(allItems);
      setFiltered(allItemsText);
      setManager('A~Manager');
      document.getElementById('nameFilterBox').value = '';
      document.getElementById('descFilterBox').value = '';
    }
  }

  const filterBy = (filterText, col) => {
    var filteredItems;
    const managerArr = manager.split('~');

    if (col === 'item_name') {
      if (filterText === '' && manager === 'A~Manager' && descFilter === '') {
        clearFilter()
      } else {
        setFiltered(filterItemsText)
      }
      setNameFilter(filterText)
      filteredItems = allItems.filter(item => item.item_name.toLowerCase().match(filterText.toLowerCase()))
      if (descFilter !== '') {
        filteredItems = filteredItems.filter(item => item.description.toLowerCase().match(descFilter.toLowerCase()))
      }
      if (manager !== 'A~Manager') {
        filteredItems = filteredItems.filter(item => `${item.user_id}` === `${managerArr[0]}`)
      }
    } else {
      if (filterText === '' && manager === 'A~Manager' && nameFilter === '') {
        clearFilter()
      } else {
        setFiltered(filterItemsText)
      }
      setDescFilter(filterText)
      filteredItems = allItems.filter(item => item.description.toLowerCase().match(filterText.toLowerCase()))
      if (nameFilter !== '') {
        filteredItems = filteredItems.filter(item => item.item_name.toLowerCase().match(nameFilter.toLowerCase()))
      }
      if (manager !== 'A~Manager') {
        filteredItems = filteredItems.filter(item => `${item.user_id}` === `${managerArr[0]}`)
      }
    }
    setItems(filteredItems)
  }

  const deleteItem = (id) => {
    fetch(`http://localhost:3001/item/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }}).then(res => res)
        .then(data => {
          fetch('http://localhost:3001/item')
            .then(response => response.json())
            .then(data => setAllItems(data))
        })
  }

  return(
    <div>
      <br/>
      <NavBar />
        <div className="container">
          <div className="filterControlArea">
            {filtered}
          </div>
          <Table striped bordered hover variant="dark" className="itemTable">
            <thead>
              <tr>
                <th className="nameCol">
                  <Form>
                    <Form.Group>
                      <Form.Control id='nameFilterBox' className="secondary"  type="text" placeholder="Item Name" onChange={(event) => filterBy(event.target.value, 'item_name')} />
                    </Form.Group>
                  </Form>
                </th>
                <th className="managerCol">
                <Dropdown>
                  <Dropdown.Toggle className="dropdownMenu" variant="dark" id="dropdown-basic">
                    {manager}
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark" as={CustomMenu} className='dropdownDiv'>
                    <Dropdown.Item id="A~Manager" className="dropdownItem" onClick={((event) => managerChange(event.target.id))}>All</Dropdown.Item>
                    {users.map((user,i) => {
                      return(<Dropdown.Item id={`${user.id}~${user.username}`} className="dropdownItem" key={i} onClick={((event) => managerChange(event.target.id))}>{user.username}</Dropdown.Item>)
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                </th>
                <th className="descCol">
                  <Form>
                    <Form.Group className="">
                      <Form.Control id='descFilterBox' type="text" placeholder="Item Description" onChange={(event) => filterBy(event.target.value, 'description')} />
                    </Form.Group>
                  </Form>
                </th>
                {loginUser.first_name ? 
                  <>
                    <th className="qtyCol">Quantity</th>
                    <th className="delCol">Remove Item</th>
                  </>:
                  ''}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                return(
                  <tr className="item" key={i} id={item.id}>
                    <td id={item.id} onClick={(event) => navigate(`/Item-Details/${event.target.id}`)}>{item.item_name}</td>
                    <td id={item.id} onClick={(event) => navigate(`/Item-Details/${event.target.id}`)}>
                      {getUsername(item.user_id)}
                    </td>
                    <td id={item.id} onClick={(event) => navigate(`/Item-Details/${event.target.id}`)}>{getDescription(item.description)}</td>
                    {loginUser.first_name ?
                      <>
                        <td className="colItem" onClick={(event) => navigate(`/Item-Details/${event.target.id}`)}>{item.quantity}</td>
                        <td className="colItem" id={item.id}><Button id={item.id} variant="danger" onClick={(event) => deleteItem(event.target.id)}>Delete</Button></td>
                      </>
                      :
                      ''
                    }
                  </tr>
                )}
              )}
            </tbody>
          </Table>
        </div>
    </div>
  )
}