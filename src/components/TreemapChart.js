import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class TreemapChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {},
      series: [
        {
          data: [
            {
              x: "New Delhi",
              y: 218,
            },
            {
              x: "Kolkata",
              y: 149,
            },
            {
              x: "Mumbai",
              y: 184,
            },
            {
              x: "Ahmedabad",
              y: 55,
            },
            {
              x: "Bangaluru",
              y: 84,
            },
            {
              x: "Pune",
              y: 31,
            },
            {
              x: "Chennai",
              y: 70,
            }
          ],
        },
      ]
    }
  }

  render() {

    return (
      <div className="donut p-16 bg-gray-100 shadow-lg rounded-md transition delay-75 hover:cursor-pointer duration-300 hover:scale-105 hover:shadow-xl">
        <Chart options={this.state.options} series={this.state.series} type="treemap" width="350" />
      </div>
    );
  }
}

export default TreemapChart;