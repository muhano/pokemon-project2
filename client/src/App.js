import Home from "./pages/Home";
import Details from "./pages/Details";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
