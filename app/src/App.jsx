import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import User from "./components/pages/User";
import Album from "./components/pages/Album";
import Photo from "./components/pages/Photo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/photo/:id" element={<Photo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
