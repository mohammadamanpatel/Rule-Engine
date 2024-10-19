import express from "express";
import { combinedRules, createRule, evaluateRules } from "../controllers/Rule.controller.js";

const router = express.Router();

router.post("/createRules", createRule);
router.post("/combinedRules", combinedRules); // Pass rule IDs in the URL
router.post("/evaluateRules", evaluateRules);  // Pass rule ID in the URL

export default router;
