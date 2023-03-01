import './App.css';
import React from 'react';

import { UseState } from "../UseState/UseState.js";
import {ClassState} from "../ClassState/ClassState.js";
import { UseReducer } from '../UseReducer.js';

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <UseReducer name="Use Reducer" />
      <br></br>
      <ClassState name="Class State" />
    </div>
  );
}

export default App;
