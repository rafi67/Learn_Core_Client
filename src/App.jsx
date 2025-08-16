import { Outlet } from "react-router"
import Navbar from "./shared/Navbar/Navbar"
import Footer from "./shared/Footer/Footer"


function App() {
  
  return (
    <div className="flex flex-col items-center justify-center w-screen md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
