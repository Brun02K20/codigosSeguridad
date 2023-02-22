import './App.css';
import React from 'react';

import { UseState } from "../UseState/UseState.js";
import {ClassState} from "../ClassState/ClassState.js";


function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <ClassState name="Class State" />
    </div>
  );
}

export default App;
