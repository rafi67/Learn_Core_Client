import { Outlet } from "react-router"
import Navbar from "./shared/Navbar/Navbar"


function App() {
  
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
