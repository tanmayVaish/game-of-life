import {useState} from "react";
import Grid from "./components/Grid";

import './App.css';



function App() {

    const row = 50;
    const col = 50;

  return (
      <>
          <Grid row={row} col={col}/>
      </>
  );
}

export default App;
