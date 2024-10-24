import "./App.css";
import ImageSearch from "./_pages/ImageSearch/ImageSearch";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./_components/navBar/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/imageSearch" />} />
            <Route path="/imageSearch" element={<ImageSearch />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
