import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup';
import Forgot_pass from './components/Forgot_pass';
import { NavLink ,BrowserRouter , Router, Routes ,Route} from "react-router-dom";
import Pagenotfound from './error/Pagenotfound';
import Home_old from './components/Home_old';
import Home_code from './components/code_compiler/Home_code';
import Certificate from './components/certificate/custome_certificate';

import Home from './components/Home';

// material ui

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      {/* <Login></Login> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot_password" element={<Forgot_pass />}></Route>
          {/* <Route path="/index_page"  element={<Home_old />}></Route> */}
          <Route path="/code" element={<Home_code />}></Route>
          <Route path="/certificate*" element={<Certificate />}></Route>
          <Route path='/home' element={<Home />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App
