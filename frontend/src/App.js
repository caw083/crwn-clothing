import Home from "./components/routes/Home/home";
import Navigation from "./components/navigation/navigation";
import Authentification from "./components/routes/Authentification/Aunthentification";

import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

const Shop = () => {
  return (
    <div>
      <h1> i AM the shop Page</h1>
      <Outlet/>
    </div>
  )
}



const ShopCategory = () => {
  const { category } = useParams()
  return (
    <div>
      <h1>i am the shop category = { category}</h1>
    </div>
  )
}
function App() {
  return (
   <Routes>
    <Route path="/" element={<Navigation/>} >
      <Route index element={<Home/>} />
      <Route path="shop" element={<Shop/>}>
        <Route path=":category" element={<ShopCategory/>} />
      </Route>
      <Route path="signin" element={<Authentification/>} />
    
    </Route>
   </Routes>
  );
}

export default App;
