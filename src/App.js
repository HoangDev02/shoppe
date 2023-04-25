import "./App.css";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";


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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
