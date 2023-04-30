import "./App.css";
import HomePage from "./pages/admin/Home/HomePage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
//user
import Home from "./pages/user/home/Home";
import ProductUser from './Components/User/Product/ProductUser'
import CartUser from './Components/User/Cart/CartUser'

function App() {
  // useEffect(() => {
  //   fetchItems();
  // }, []);

  // const [items, setItems] = useState([])

  // //API
  // const fetchItems = async() => {
  //   const data = await fetch('/product');
  //   const items = await data.json();
  //   setItems(items)
  // }

  return (
    <Router>
    <NavBar />
    <div className="App"> 
      <Routes>
        {/* admin */}
        <Route path="/admin" element={<HomePage />} />

        {/* User */}
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product/:id" element= {<ProductUser/>}></Route>
        <Route path="/cart/:userId" element= {<CartUser/>}></Route>
        {/* Compoment */}
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    <Footer/>
  </Router>
  );
}

export default App;
