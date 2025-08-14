import { Outlet } from "react-router"
import Navbar from "./shared/Navbar/Navbar"
import Footer from "./shared/Footer/Footer"


function App() {
  
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
