import React, { Component } from "react";
import Header from "./Header";
import OrderTable from "./tables/OrderTable";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex items-center justify-center">
                <OrderTable />
            </div>
        </div>
        <div></div>
      </div>
    );
  }
  
}

export default Orders;
