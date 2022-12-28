import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uri: window.location.href.split('/')[3]
    };
  }
  render() {
    return (
      <div className="w-full flex bg-gray-700 p-12 shadow-lg justify-between sticky top-0 z-20">
        <div className="flex flex-col gap-y-1 text-white">
            <span className="text-white font-bold text-2xl cursor-pointer" onClick={() => window.location.href = "/"}>Logistic Manager</span>
            <span>{this.state.uri === "" ? "Home" : this.state.uri === "transport-fees" ? "Transport Fees" : this.state.uri.charAt(0).toUpperCase() + this.state.uri.slice(1)}</span>
        </div>
        
        <div className="font-semibold flex gap-x-8 text-gray-400 shadow-xl px-4 items-center">
            <a href="/" className={"hover:text-gray-500 " + (this.state.uri === "" ? "text-gray-200 hover:text-gray-300" : null)}>Home</a>
            <a href="/countries" className={"hover:text-gray-500 " + (this.state.uri === "countries" ? "text-gray-200 hover:text-gray-300" : null)}>Countries</a>
            <a href="/stores" className={"hover:text-gray-500 " + (this.state.uri === "stores" ? "text-gray-200 hover:text-gray-300" : null)}>Stores</a>
            <a href="/products" className={"hover:text-gray-500 " + (this.state.uri === "products" ? "text-gray-200 hover:text-gray-300" : null)}>Products</a>
            <a href="/stocks" className={"hover:text-gray-500 " + (this.state.uri === "stocks" ? "text-gray-200 hover:text-gray-300" : null)}>Stocks</a>
            <a href="/transports" className={"hover:text-gray-500 " + (this.state.uri === "transports" ? "text-gray-200 hover:text-gray-300" : null)}>Transports</a>
            <a href="/transport-fees" className={"hover:text-gray-500 " + (this.state.uri === "transports" ? "text-gray-200 hover:text-gray-300" : null)}>Transport Fees</a>
            <a href="/customers" className={"hover:text-gray-500 " + (this.state.uri === "customers" ? "text-gray-200 hover:text-gray-300" : null)}>Customers</a>
            <a href="/orders" className={"hover:text-gray-500 " + (this.state.uri === "orders" ? "text-gray-200 hover:text-gray-300" : null)}>Orders</a>
            
        </div>
      </div>
    );
  }
  
}

export default Header;
