/* eslint-disable no-unused-vars */
import * as React from "react";

import QuickFilter from "./QuickFilter";
import "./App.css";
import brands from "./json/brands.json";
import closingDates from "./json/closingDates.json";
import movements from "./json/movements.json";
import reservePrice from "./json/reservePrice.json";
import locations from "./json/locations.json";

function App() {
  return (
    <div>
      <div
        id="sticky-bar"
        className=" sticky top-0 flex w-full justify-center border-b bg-white "
      >
        <div
          id="scroll-container"
          className=" flex w-[984px] max-w-[984px] justify-start overflow-clip overflow-x-auto whitespace-nowrap px-4 py-4 font-sans"
        >
          <div className="flex justify-start gap-2">
            <QuickFilter
              filterValues={reservePrice}
              filterLabel="Reserve price"
            />
            <QuickFilter
              filterValues={closingDates}
              filterLabel="Closing date"
            />
            <QuickFilter filterValues={locations} filterLabel="Location" />
            <QuickFilter filterValues={brands} filterLabel="Brand" />
            <QuickFilter
              filterValues={movements}
              filterLabel="Watch movement"
            />
          </div>
        </div>
      </div>
      <div id="content" className=" h-[300vh] bg-slate-50"></div>
    </div>
  );
}

export default App;
