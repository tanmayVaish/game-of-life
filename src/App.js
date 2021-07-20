import {useState} from "react";
import Grid from "./components/Grid";

import './App.css';



function App() {

    const row = 100;
    const col = 100;

  return (
      <>
          <Grid row={row} col={col}/>
      </>
  );
}

export default App;
