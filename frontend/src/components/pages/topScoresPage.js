import React, { useEffect, useState } from "react";

const TopScores = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/topScores`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok)
          throw new Error(`GET topScores failed: ${response.status}`);

        const data = await response.json();
        setTopUsers(data);
      } catch (err) {
        console.error("Failed to fetch top scores:", err);
        alert("Error retrieving top scores. Please try again.");
      }
    };

    fetchTopScores();
  }, []);


  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Top 5 High Scores</h2>
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr className="bg-gray-100 text-gray-700">
        <th className="py-2 px-4 text-left">#</th>
        <th className="py-2 px-4 text-left">Username</th>
        <th className="py-2 px-4 text-right">High Score</th>
      </tr>
    </thead>
    <tbody>
      {topUsers.map((user, index) => (
        <tr
          key={index}
          className={`border-b ${
            index === 0 ? "bg-yellow-100 font-semibold" : "hover:bg-gray-50"
          }`}
        >
          <td className="py-2 px-4">{index + 1}</td>
          <td className="py-2 px-4">{user.username}</td>
          <td className="py-2 px-4 text-right">{user.highScore}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default TopScores;