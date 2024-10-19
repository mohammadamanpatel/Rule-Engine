import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRule } from '../redux/Rule-slice'; // Ensure the correct path

const CreateRule = () => {
  const [type, setType] = useState('operator'); // Start with operator
  const [value, setValue] = useState('');
  const [nodes, setNodes] = useState([]); // Array for nodes
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.rules);

  const handleAddNode = () => {
    // Validate inputs
    if (!type || !value) {
      alert('Both type and value are required.');
      return;
    }

    // Create new node based on current input
    const newNode = {
      type,
      value,
      left: [],
      right: [],
    };

    // Add new node to nodes array
    setNodes([...nodes, newNode]);

    // Reset inputs after adding node
    setType('operator');
    setValue('');
  };

  const handleAddChildNode = (index, isLeft) => {
    const currentNodes = [...nodes]; // Clone the current nodes array
    const newChildNode = {
      type: 'operand', // Assuming child nodes are operands
      value: '',
      left: [],
      right: [],
    };

    if (isLeft) {
      currentNodes[index].left.push(newChildNode); // Add to left nodes
    } else {
      currentNodes[index].right.push(newChildNode); // Add to right nodes
    }

    setNodes(currentNodes); // Update state with new nodes
  };

  const handleValueChange = (index, isLeft, value) => {
    const currentNodes = [...nodes];
    if (isLeft) {
      currentNodes[index].left[currentNodes[index].left.length - 1].value = value;
    } else {
      currentNodes[index].right[currentNodes[index].right.length - 1].value = value;
    }
    setNodes(currentNodes);
  };

  const handleClearNodes = () => {
    setNodes([]); // Clear all nodes
  };

  const handleSubmit = () => {
    // Dispatch the action to create the rule (including AST)
    dispatch(createRule({ ruleAST: nodes }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Rule</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Node Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="operator">Operator</option>
          <option value="operand">Operand</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Value:</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={type === 'operand' ? 'e.g., age > 30' : 'e.g., AND/OR'}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={handleAddNode}
          className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
        >
          Add Node
        </button>
      </div>

      {/* Nodes Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Nodes</h3>
        {nodes.length > 0 ? (
          <>
            {nodes.map((node, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50 mb-2">
                <p className="text-gray-600">Node: {JSON.stringify(node)}</p>
                <button
                  onClick={() => handleAddChildNode(index, true)}
                  className="mt-2 bg-green-500 text-white rounded-md p-1 hover:bg-green-600"
                >
                  Add Left Child
                </button>
                <button
                  onClick={() => handleAddChildNode(index, false)}
                  className="mt-2 bg-blue-500 text-white rounded-md p-1 hover:bg-blue-600"
                >
                  Add Right Child
                </button>
                {node.left.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold">Left Nodes:</h4>
                    {node.left.map((childNode, childIndex) => (
                      <div key={childIndex} className="p-2 border border-gray-300 rounded-md bg-gray-100">
                        <input
                          type="text"
                          value={childNode.value}
                          onChange={(e) => handleValueChange(index, true, e.target.value)}
                          placeholder="Enter value for left child"
                          className="w-full border border-gray-300 rounded-md p-1"
                        />
                        <p className="text-gray-600">Left Child Node: {JSON.stringify(childNode)}</p>
                      </div>
                    ))}
                  </div>
                )}
                {node.right.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold">Right Nodes:</h4>
                    {node.right.map((childNode, childIndex) => (
                      <div key={childIndex} className="p-2 border border-gray-300 rounded-md bg-gray-100">
                        <input
                          type="text"
                          value={childNode.value}
                          onChange={(e) => handleValueChange(index, false, e.target.value)}
                          placeholder="Enter value for right child"
                          className="w-full border border-gray-300 rounded-md p-1"
                        />
                        <p className="text-gray-600">Right Child Node: {JSON.stringify(childNode)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleClearNodes}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Clear All Nodes
            </button>
          </>
        ) : (
          <p>No nodes added yet.</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full text-white rounded-md p-2 ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
      >
        {loading ? 'Creating...' : 'Create Rule'}
      </button>

      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
};

export default CreateRule;
