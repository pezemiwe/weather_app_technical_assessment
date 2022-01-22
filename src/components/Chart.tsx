import React from "react";
import { Line } from "react-chartjs-2";

interface props {
    temp: [],
    labels: [],
}

const Chart:React.FC<props> = ({ temp, labels}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temp",
        data: temp,
        fill: true,
        borderColor: "#5596f6",
        backgroundColor: "rgb(238,244,254)",
        lineTension: 0.3,
        // radius: -100,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },

    scales: {
      x: {
        grid: {
          color: "transparent",
          borderColor: "#1c92d2d4",
        },
      },
      y: {
        display: false,
        grid: {
          borderColor: "#1c92d2d4",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Weather Info",
        color: "#1c92d2",
        font: {
          size: 20,
        },
      },
    //   tooltip: {
    //     backgroundColor: "transparent",
    //     bodyFont: {
    //       size: 20,
    //     },
    //     //   callbacks: {
    //     //     title: function () {
    //     //       return null;
    //     //     },
    //     //     label: function (tooltipItems) {
    //     //       return null;
    //     //     },
    //     //     labelTextColor: function (context) {
    //     //       return "#5596f6";
    //     //     },
    //     //     afterLabel: function (tooltipItems) {
    //     //       return tooltipItems.parsed.y + "°C";
    //     //     },
    //     //   },
    //   },
    },
  };

  return <div><Line data={data} options={options} /></div>;
};

export default Chart;
