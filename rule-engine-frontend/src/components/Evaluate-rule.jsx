import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { evaluateRecentRule } from "../redux/Rule-slice";

const EvaluateRule = () => {
  // State for input values
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  
  const dispatch = useDispatch();
  const { loading, result, error } = useSelector((state) => state.rules);

  const handleEvaluateRule = () => {
    // Create userData object to pass
    const userData = { age, department, salary, experience };
    console.log("userData", userData);
    dispatch(evaluateRecentRule(userData));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Evaluate Rule</h2>

      {/* Age Input */}
      <input
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {/* Department Input */}
      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="Department"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {/* Salary Input */}
      <input
        type="text"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {/* Experience Input */}
      <input
        type="text"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        placeholder="Experience (years)"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {/* Submit Button */}
      <button
        onClick={handleEvaluateRule}
        disabled={loading}
        className={`w-full p-2 bg-blue-500 text-white rounded ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Evaluating..." : "Evaluate Rule"}
      </button>

      {/* Display Result */}
      {result && <p className="text-green-500 mt-4">Result: {result}</p>}
      
      {/* Display Error */}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default EvaluateRule;
