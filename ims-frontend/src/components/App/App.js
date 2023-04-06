import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { AccountCreate } from '../AccountCreate/AccountCreate';
import { Login } from '../Login/Login';
import { ItemDetails } from '../ItemDetails/ItemDetails';
import { useState, createContext } from 'react';

export const GlobalContext = createContext();

function App() {

  const [loginUser, setLoginUser] = useState({});

  return (
    <GlobalContext.Provider value={{loginUser, setLoginUser}}>
      <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Create-Account' element={<AccountCreate />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Item-Details' element={<ItemDetails />} />
        </Routes>
      </Router>
    </div>
    </GlobalContext.Provider>
  );
}

export default App;
