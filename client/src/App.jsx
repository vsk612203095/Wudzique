import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login, Register } from "./pages/Login/Login.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      ;
    </>
  );
}

export default App;
