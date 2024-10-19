---

# Rule Engine Project

Test Cases

### Example 1: Simple AND Condition

Input Rule:

```javascript
const ruleString = "(age > 30 AND department = 'Sales')";
```

AST Representation:

```javascript
{
  type: "operator",
  value: "AND",
  left: {
    type: "operand",
    value: {
      field: "age",
      operator: ">",
      value: 30
    }
  },
  right: {
    type: "operand",
    value: {
      field: "department",
      operator: "=",
      value: "Sales"
    }
  }
}
```

User Data:

```javascript
const userData = { age: 35, department: "Sales", salary: 60000, experience: 3 };
```

isEligible: `true`

---

### Example 2: Simple OR Condition

Input Rule:

```javascript
const ruleString = "(salary > 50000 OR experience > 5)";
```

AST Representation:

```javascript
{
  type: "operator",
  value: "OR",
  left: {
    type: "operand",
    value: {
      field: "salary",
      operator: ">",
      value: 50000
    }
  },
  right: {
    type: "operand",
    value: {
      field: "experience",
      operator: ">",
      value: 5
    }
  }
}
```

User Data:

```javascript
const userData = { age: 35, department: "Sales", salary: 60000, experience: 3 };
```

isEligible: `true`

---

### Example 3: Combined AND and OR Conditions

Input Rules:

```javascript
const rules = [
  "(age > 30 AND department = 'Sales')",
  "(salary > 50000 OR experience > 5)"
];
const operator = "AND";
```

Combined AST Representation:

```javascript
{
  type: "operator",
  value: "AND",
  left: {
    type: "operator",
    value: "AND",
    left: {
      type: "operand",
      value: {
        field: "age",
        operator: ">",
        value: 30
      }
    },
    right: {
      type: "operand",
      value: {
        field: "department",
        operator: "=",
        value: "Sales"
      }
    }
  },
  right: {
    type: "operator",
    value: "OR",
    left: {
      type: "operand",
      value: {
        field: "salary",
        operator: ">",
        value: 50000
      }
    },
    right: {
      type: "operand",
      value: {
        field: "experience",
        operator: ">",
        value: 5
      }
    }
  }
}
```

User Data:

```javascript
const userData = { age: 35, department: "Sales", salary: 60000, experience: 3 };
```

isEligible: `true`

---

### Example 4: Another Combined AND and OR Condition

Input Rules:

```javascript
const rules = [
  "(age < 25 AND department = 'Marketing')",
  "(salary > 60000 OR experience < 3)"
];
const operator = "OR";
```

Combined AST Representation:

```javascript
{
  type: "operator",
  value: "OR",
  left: {
    type: "operator",
    value: "AND",
    left: {
      type: "operand",
      value: {
        field: "age",
        operator: "<",
        value: 25
      }
    },
    right: {
      type: "operand",
      value: {
        field: "department",
        operator: "=",
        value: "Marketing"
      }
    }
  },
  right: {
    type: "operator",
    value: "OR",
    left: {
      type: "operand",
      value: {
        field: "salary",
        operator: ">",
        value: 60000
      }
    },
    right: {
      type: "operand",
      value: {
        field: "experience",
        operator: "<",
        value: 3
      }
    }
  }
}
```

User Data:

```javascript
const userData = { age: 28, department: "Marketing", salary: 30000, experience: 6 };
```

isEligible: `true`

---

### Additional Test Cases

1. Input Rule:

   ```javascript
   const ruleString = "(age < 30 OR salary < 50000)";
   ```

   User Data:

   ```javascript
   const userData = { age: 28, salary: 48000 };
   ```

   Result: `true`

2. Input Rule:

   ```javascript
   const ruleString = "(department = 'HR' AND experience >= 2)";
   ```

   User Data:

   ```javascript
   const userData = { department: "HR", experience: 3 };
   ```

   Result: `true`

3. Input Rule:

   ```javascript
   const ruleString = "(salary < 40000 AND (experience < 2 OR department = 'Intern'))";
   ```

   User Data:

   ```javascript
   const userData = { salary: 35000, experience: 1, department: "Intern" };
   ```

   isEligible: `true`

---
