/* eslint-disable no-unused-vars */
import * as React from "react";

import QuickFilter from "./QuickFilter";
import "./App.css";
import brands from "./json/brands.json";
import closingDates from "./json/closingDates.json";

function App() {
  return (
    <div className=" flex justify-start gap-3 bg-slate-100 px-8 py-40 font-sans">
      <QuickFilter filterValues={brands} filterLabel="Brand" />
      <QuickFilter filterValues={closingDates} filterLabel="Closing date" />
    </div>
  );
}

export default App;
