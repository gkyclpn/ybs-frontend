import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Countries from "./components/Countries"
import Stores from "./components/Stores"
import Products from "./components/Products";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
         <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
  }
  
}

export default App;
