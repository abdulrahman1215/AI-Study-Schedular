import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/Landing"
import AIPlanner from "./pages/AIPlanner"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/ai-planner" element={<AIPlanner />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App