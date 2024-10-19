import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { combineRecentRules } from "../redux/Rule-slice";

const CombineRules = () => {
  const dispatch = useDispatch();
  const { loading, error, recentRules } = useSelector((state) => state.rules);
  console.log("recentRules",recentRules)
  const [operator, setOperator] = useState("AND");
  console.log("operator", operator);
  const handleCombineRules = () => {
    // Use the operator and dispatch the combineRecentRules action
    dispatch(combineRecentRules(operator));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Combine Rules</h2>
      <p className="mb-4">Combining the most recent rules:</p>
      <ul className="list-disc mb-4 pl-5">
        {recentRules.slice(0, 2).map((rule) => (
          <li key={rule._id}>Rule ID: {rule._id}</li>
        ))}
      </ul>
      <select
        value={operator}
        onChange={(e) => setOperator(e.target.value)} // Update operator state on selection
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
      <button
        onClick={handleCombineRules}
        disabled={loading}
        className={`w-full p-2 bg-green-500 text-white rounded ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Combining..." : "Combine Rules"}
      </button>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default CombineRules;
