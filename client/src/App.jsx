import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
      ;
    </>
  );
}

export default App;
