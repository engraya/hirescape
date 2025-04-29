import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { mockJobs } from "@/mockData/mockJobs";

ChartJS.register(
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: mockJobs.map((job) => job.title),
      datasets: [
        {
          label: "Applicants",
          data: mockJobs.map((job) => job.applicants),
          backgroundColor: "#0EA5E9", // sky-500
          borderRadius: 6,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Applicants per Job Role",
        },
      },
    });
  }, []);

  return (
    <div className="bg-white m-auto h-[50vh] w-full rounded-lg border p-4 md:col-span-2 lg:h-[70vh]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
