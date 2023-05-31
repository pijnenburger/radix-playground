/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import * as React from "react";

function FilterCountIndicator({ value }) {
  // const toprightStyle = "absolute -right-3 -top-3 z-10 h-6 w-6 text-sm";
  const inlineStyle = "h-[20px] w-[20px] text-xs";

  return (
    <div
      className={`${inlineStyle} flex items-center justify-center rounded-full bg-slate-800 px-2 pt-[2px] font-mono text-blue-50`}
    >
      {value}
    </div>
  );
}

export default FilterCountIndicator;
