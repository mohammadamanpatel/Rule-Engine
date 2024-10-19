import React from 'react';
import CreateRule from './components/Create-rule';
import CombineRules from './components/Combine-rule';
import EvaluateRule from './components/Evaluate-rule';

const App = () => {
  return (
    <div>
      <CreateRule />
      <CombineRules />
      <EvaluateRule />
    </div>
  );
};

export default App;
