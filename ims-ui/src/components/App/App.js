import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { AccountCreate } from '../AccountCreate/AccountCreate';
import { Login } from '../Login/Login';
import { ItemDetails } from '../ItemDetails/ItemDetails';
import { AddItem } from '../AddItem/AddItem';
import { useState, createContext } from 'react';

export const GlobalContext = createContext();

function App() {

  const [loginUser, setLoginUser] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <GlobalContext.Provider value={{loginUser, setLoginUser, allItems, setAllItems, users, setUsers}}>
      <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Create-Account' element={<AccountCreate />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Item-Details/:id' element={<ItemDetails />} />
          <Route path='/add-item' element={<AddItem />} />
        </Routes>
      </Router>
    </div>
    </GlobalContext.Provider>
  );
}

export default App;
