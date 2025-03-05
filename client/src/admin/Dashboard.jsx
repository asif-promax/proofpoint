import React from "react";
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
  const activityData = [
    { month: "JAN", cases: 100 },
    { month: "FEB", cases: 200 },
    { month: "MAR", cases: 300 },
    { month: "APR", cases: 250 },
    { month: "MAY", cases: 300 },
    { month: "JUN", cases: 400 },
    { month: "JUL", cases: 450 },
    { month: "AGU", cases: 500 },
    { month: "SEP", cases: 300 },
    { month: "OCT", cases: 550 },
    { month: "NOV", cases: 450 },
    { month: "DEC", cases: 425 },
  ];

  const progressData = [
    { topic: "Solved Complaints", percentage: 92 },
    { topic: "Pending Complaints", percentage: 5 },
    { topic: "Rejected Complaints", percentage: 3 },
  ];

  return (
    <div className="w-4/5 bg-blue-100 px-5 min-h-screen">
        <div className="flex justify-between border-b py-2 border-white">
            <p>Overview</p>
            <p>Download</p>
        </div>
      {/* Top Metrics Cards */}
      <div className="flex justify-center gap-6 my-5 ">
        {[
          { title: "Total Cases", value: "13k", icon: "📅" },
          { title: "Verified Cases", value: "12k", icon: "✅" },
          { title: "Pending", value: "300", icon: "⏲️" },
          { title: "Rejected", value: "700", icon: "🚫" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg  rounded-2xl p-5 text-center "
          >
            <h2 className="text-gray-500">{item.title} {item.icon}</h2>
            <p className="text-3xl font-bold">
               {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart and Strongest Topics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-5 shadow-lg rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Activity</h3>
          <ResponsiveContainer width="100%" height={300} className="text-xs">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 shadow-lg rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Strongest Topics</h3>
          <ul>
            {progressData.map((topic, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{topic.topic}</span>
                  <span>{topic.percentage}% Correct</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${topic.percentage}%` }}
                  />
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
