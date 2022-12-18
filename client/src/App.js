import {Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import VerifyUser from './pages/verifyUser';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/verifyUser" element={<VerifyUser />}></Route>

      </Routes>
    </>
  );
}

export default App;
