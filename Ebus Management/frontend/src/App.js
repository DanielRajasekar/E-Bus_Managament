import './App.css';
import {Route,Routes} from 'react-router-dom'
import {UserContextProvider} from './context/UserContext'
import Login from './pages/Login';
import Register from './pages/Register';
import Driver from './pages/Driver';
import Admin from './pages/Admin';
import User from './pages/User';
// import { Logout } from './component/Logout';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
      </Routes>
      {/* <Logout/> */}
    </UserContextProvider>
  );
}

export default App;
