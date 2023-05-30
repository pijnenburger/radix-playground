/* eslint-disable no-unused-vars */
import * as React from "react";

import QuickFilter from "./QuickFilter";
import "./App.css";
import filterValues from "./filterValues.json";

function App() {
  return (
    <div className="flex justify-center bg-slate-100 p-40">
      <QuickFilter filterValues={filterValues} filterLabel="Brand" />
    </div>
  );
}

export default App;
