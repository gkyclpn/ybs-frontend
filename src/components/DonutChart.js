import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class DonutChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {},
      series: [44, 55, 41, 17, 15],
      labels: ['A', 'B', 'C', 'D', 'E']
    }
  }

  render() {

    return (
      <div className="donut p-16 bg-gray-100 shadow-lg rounded-md transition delay-75 hover:cursor-pointer duration-300 hover:scale-105 hover:shadow-xl">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="380"  />
      </div>
    );
  }
}

export default DonutChart;