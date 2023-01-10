import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ data }) => {
  const allData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Jobs Applied",
        data: data,
        backgroundColor: "rgb(63, 96, 160)",
        borderColor: "rgb(133, 133, 133)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="dashboard__chart">
      <Bar data={allData} />
    </section>
  );
};

export default Chart;
