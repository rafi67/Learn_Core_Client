import { Outlet, useLocation } from "react-router";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

function App() {
  const { pathname } = useLocation();

  const noHeaderFooter =
    pathname.includes("signIn") || pathname.includes("signup");

  return (
    <div className="flex flex-col items-center justify-center w-screen md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
      {noHeaderFooter || <Navbar />}
      <Outlet />
      {noHeaderFooter || <Footer />}
    </div>
  );
}

export default App;
