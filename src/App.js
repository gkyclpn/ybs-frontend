import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Countries from "./components/Countries"
import Stores from "./components/Stores"
import Products from "./components/Products";
import Stocks from "./components/Stocks";
import Customers from "./components/Customers";
import Orders from "./components/Orders";

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
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
        </BrowserRouter>
    );
  }
  
}

export default App;
