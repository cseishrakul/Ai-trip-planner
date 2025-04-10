import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import Header from "./pages/custom/Header";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </div>
  );
}

export default App;
