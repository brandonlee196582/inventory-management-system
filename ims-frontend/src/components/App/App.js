import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { AccountCreate } from '../AccountCreate/AccountCreate';
import { Login } from '../Login/Login';
import { ItemDetails } from '../ItemDetails/ItemDetails';

function App() {
  return (
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
  );
}

export default App;
