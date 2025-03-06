import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCases: 0,
    verifiedCases: 0,
    pendingCases: 0,
    rejectedCases: 0,
    activityData: [],
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard/dashboard-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="w-4/5 bg-blue-100 px-5 min-h-screen">
      <div className="flex justify-between border-b py-2 border-white">
        <p>Overview</p>
        <button onClick={() => window.print()} className="text-blue-600">Download</button>
      </div>

      {/* Top Metrics Cards */}
      <div className="flex justify-center gap-6 my-5">
        {[
          { title: "Total Cases", value: stats.totalCases, icon: "📅" },
          { title: "Verified Cases", value: stats.verifiedCases, icon: "✅" },
          { title: "Pending", value: stats.pendingCases, icon: "⏲️" },
          { title: "Rejected", value: stats.rejectedCases, icon: "🚫" },
        ].map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-2xl p-5 text-center">
            <h2 className="text-gray-500">{item.title} {item.icon}</h2>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart and Strongest Topics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-5 shadow-lg rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Activity</h3>
          <ResponsiveContainer width="100%" height={300} className="text-xs">
            <BarChart data={stats.activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 shadow-lg rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Complaints Progress</h3>
          <ul>
            {[
              { topic: "Solved Complaints", percentage: (stats.verifiedCases / stats.totalCases) * 100 || 0 },
              { topic: "Pending Complaints", percentage: (stats.pendingCases / stats.totalCases) * 100 || 0 },
              { topic: "Rejected Complaints", percentage: (stats.rejectedCases / stats.totalCases) * 100 || 0 },
            ].map((topic, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{topic.topic}</span>
                  <span>{Math.round(topic.percentage)}% </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: `${topic.percentage}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
