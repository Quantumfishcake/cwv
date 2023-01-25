import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { useState } from "react";

export default function clientDataContainer({ clientData }) {
  const [averageSmartPageScore, setAverageSmartPageScore] = useState(0);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "right",
        max:100,
        min:0,
      },
    },
  };

  const getAverageSmartPageScore = () => {
    let total = [];
    clientData.forEach((client) => {
      let clientTotal = [];
      client.forEach((data) => {
        clientTotal.push(data.smart_page_score);
      });
      total.push(clientTotal);
    });
    console.log("total", total);
    let result = [];
    for (var i = 0; i < total[0].length; i++) {
      var num = 0;
      //still assuming all arrays have the same amount of numbers
      for (var i2 = 0; i2 < total.length; i2++) {
        if (total[i2][i] !== undefined) {
          num += +total[i2][i];
        } else {
          num += 0;
        }
      }
      console.log(num);
      result.push(Math.round(num / total.length));
    }
    console.log(result);
    return result;
  };

  const labels = clientData[0].map((x) => x.date).reverse();

  const data2 = clientData.map((client) => {
    let smart_page_score = client.map((x) => x.smart_page_score);
    if (smart_page_score.length < labels.length) {
      smart_page_score = smart_page_score.concat(
        Array(labels.length - smart_page_score.length).fill(0)
      );
    }
    console.log(client[0].client_name);
    return {
      label: `${client[0].client_name}`,
      data: smart_page_score.reverse(),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
      hidden: true,
    };
  });

  const data = {
    labels,
    datasets: [...data2, {
      label: `Average`,
      data: getAverageSmartPageScore().reverse(),
      borderColor: "rgb(0, 128, 0)",
      backgroundColor: "rgba(0, 128, 0, 0.5)",
      yAxisID: "y",
    }],
  };

  return <Line options={options} data={data} />;
}
