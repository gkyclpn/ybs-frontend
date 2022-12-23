import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        };
      }
    
      render() {
        return (
              <div className="mixed-chart p-8 bg-gray-100 shadow-lg rounded-md transition delay-75 hover:cursor-pointer duration-300 hover:scale-105 hover:shadow-xl">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="bar"
                  width="500"
                />
              </div>

        );
      }
}

export default BarChart