
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.tsx"
import Signup from "./pages/Signup.tsx"
import Login from "./pages/Login.tsx"
function App() {


  return (
    <>
      
      <Router>
        <Routes>
          <Route path='/landing' element={<Landing/>}></Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
