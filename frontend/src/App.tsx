import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignUp } from "./pages/signup"
import { SignIn } from "./pages/signin"
import { MyTodos } from "./pages/mytodos"


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/mytodos' element={<MyTodos/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App