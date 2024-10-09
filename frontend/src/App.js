import "./App.css";
import ImageSearch from "./_pages/ImageSearch/ImageSearch";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./_components/navBar/Navbar";

function App() {
  // Add your App ID
  //const app = new Realm.App({ id: APP_ID });

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/imageSearch" element={<ImageSearch />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
