import mongoose from "mongoose";
import Rule from "../models/Rule.model.js";

export const createRule = async (req, res) => {
  try {
    console.log("req.body in createRule", req.body);

    const { ruleAST } = req.body; // Expecting the AST structure in the request body
    console.log("ruleAST...", ruleAST.ruleAST);

    // Validate ruleAST structure
    if (!Array.isArray(ruleAST.ruleAST)) {
      console.log("Invalid ruleAST structure");
      return res.status(400).json({ message: "Invalid ruleAST structure" });
    }

    // Helper function to validate nodes recursively
    const validateNode = (node) => {
      if (!node || typeof node !== "object") {
        return false; // Invalid node
      }

      const { type, value, left, right } = node;

      // Check if type and value are present
      if (!type || !value) {
        return false;
      }

      // Validate left and right nodes if they exist
      if (Array.isArray(left)) {
        for (const child of left) {
          if (!validateNode(child)) {
            return false; // Invalid child node
          }
        }
      }

      if (Array.isArray(right)) {
        for (const child of right) {
          if (!validateNode(child)) {
            return false; // Invalid child node
          }
        }
      }

      return true; // Valid node
    };

    // Ensure all nodes in ruleAST have required fields
    for (const node of ruleAST.ruleAST) {
      console.log("node", node);
      if (!validateNode(node)) {
        return res
          .status(400)
          .json({ message: "Each node must have type and value" });
      }
    }

    // Create a new rule and save it to the database
    const newRule = await Rule.create({ ruleAST });
    console.log("newRule", newRule);

    res
      .status(201)
      .json({ message: "Rule created successfully", rule: newRule });
  } catch (error) {
    console.error("Error creating rule:", error); // Logging error for debugging
    res
      .status(500)
      .json({ message: "Error creating rule", error: error.message });
  }
};

// Controller to fetch the most recent two rules
export const combinedRules = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { operator } = req.body;
    // Fetch recent rules
    const rules = await Rule.find().sort({ createdAt: -1 }).limit(2);
    console.log("rules", rules);

    // Check if we fetched enough rules
    if (rules.length < 2) {
      return res
        .status(400)
        .json({ message: "Not enough recent rules to combine." });
    }

    // Extract ruleIds and operator from params and body
    const ruleIdsArray = rules.map((rule) => rule._id.toString());

    // Validate if at least two rule IDs are available
    if (ruleIdsArray.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two rule IDs are required" });
    }

    // Validate if all ruleIds are valid MongoDB ObjectIds
    const invalidIds = ruleIdsArray.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidIds.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid rule IDs: ${invalidIds.join(", ")}` });
    }

    // Combine the ASTs of the rules
    const combinedAST = {
      type: "operator",
      value: operator,
      left: rules[0].ruleAST,
      right: rules[1].ruleAST,
    };

    // Create a new combined rule
    const combinedRule = new Rule({ ruleAST: combinedAST });
    await combinedRule.save();

    // Send back combined rule and recent rules
    res.status(201).json({
      message: "Rules combined successfully",
      rule: combinedRule,
      recentRules: rules,
    });
  } catch (error) {
    console.error("Error handling rules:", error);
    res.status(500).json({ message: "Error handling rules", error });
  }
};

export const evaluateRules = async (req, res) => {
  try {
    console.log("req.body in evaluateRules", req.body);
    const { userData } = req.body; // User data from the request body

    // Fetch the most recent rule from the database
    const rule = await Rule.findOne() // No need for a 'combined' field
      .sort({ createdAt: -1 }) // Sort by creation date to get the most recent
      .exec();

    console.log("rule", rule);
    if (!rule) {
      return res.status(404).json({ message: "No rule found" });
    }

    // Evaluate the rule AST recursively
    const evaluateNode = (node, data) => {
      if (node.type === "operator") {
        const leftResult = evaluateNode(node.left, data);
        const rightResult = evaluateNode(node.right, data);

        return node.value === "AND"
          ? leftResult && rightResult
          : leftResult || rightResult;
      } else if (node.type === "operand") {
        const [attribute, operator, threshold] = node.value.split(" ");
        const userValue = data[attribute];

        if (operator === ">") return userValue > Number(threshold);
        if (operator === "<") return userValue < Number(threshold);
        if (operator === "=") return userValue === threshold;
      }
      return false;
    };

    // Evaluate the rule against the provided user data
    const isEligible = evaluateNode(rule.ruleAST, userData);

    res.status(200).json({ eligible: isEligible });
  } catch (error) {
    console.error("Error evaluating rule:", error);
    res.status(500).json({ message: "Error evaluating rule", error });
  }
};
