
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.tsx"
function App() {


  return (
    <>
      
      <Router>
        <Routes>
          <Route path='/landing' element={<Landing/>}></Route>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
