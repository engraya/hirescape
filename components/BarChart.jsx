// BarChart.tsx
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
import { getJobs } from "@/lib/api"; // Adjust this path based on your project

ChartJS.register(
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const BarChart = ({ token }) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobs = await getJobs(token);
        const filtered = jobs?.filter((job) => job.title && job.applicants);

        setChartData({
          labels: filtered.map((job) => job.title),
          datasets: [
            {
              label: "Applicants",
              data: filtered.map((job) => job.applicants?.length || 0),
              backgroundColor: "#0EA5E9",
              borderRadius: 6,
            },
          ],
        });

        setChartOptions({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Applicants per Job Role",
            },
          },
        });
      } catch (error) {
        console.error("Failed to fetch jobs for chart:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchJobs();
  }, [token]);

  return (
    <div className="bg-white m-auto h-[50vh] w-full rounded-lg border p-4 md:col-span-2 lg:h-[70vh]">
      {loading ? (
        <p className="text-center text-gray-500">Loading chart...</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default BarChart;
