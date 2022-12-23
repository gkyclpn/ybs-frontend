import React, { Component } from "react";
import Header from "./Header";
import BarChart from "./BarChart"
import DonutChart from "./DonutChart";
import TreemapChart from "./TreemapChart";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-full max-w-[75%] flex flex-wrap items-center justify-center gap-x-64 gap-y-16">
            <div className="text-center flex flex-col gap-y-2">
                <span>Bar Chart</span>
                <BarChart />
            </div>
            <div className="text-center flex flex-col gap-y-2">
                <span>Donut Chart</span>
                <DonutChart />
            </div>
            <div className="text-center flex flex-col gap-y-2">
                <span>Treemap Chart</span>
                <TreemapChart />
            </div>
        </div>
        <div></div>
      </div>
    );
  }
  
}

export default Home;
