import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignUp } from "./pages/signup"
import { SignIn } from "./pages/signin"
import { MyTodos } from "./pages/mytodos"
import { RecoilRoot } from "recoil"


function App() {

  return (
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/mytodos' element={<MyTodos/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )
}

export default App