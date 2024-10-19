import mongoose from "mongoose";

// Node schema for the AST
const nodeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["operator", "operand"], // Ensure only valid types
  },
  left: {
    type: [mongoose.Schema.Types.Mixed], // Array of left child nodes
    default: [], // Initialize as an empty array
  },
  right: {
    type: [mongoose.Schema.Types.Mixed], // Array of right child nodes
    default: [], // Initialize as an empty array
  },
  value: {
    type: String,
    required: true, // Making it required for clarity
  },
});

// Rule schema to store the entire rule
const ruleSchema = new mongoose.Schema({
  ruleAST: {
    type: [Object], // Array of nodes for the rule AST
    required: true, // Ensure that ruleAST is always present
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Rule = mongoose.model("Rule", ruleSchema);

export default Rule;
