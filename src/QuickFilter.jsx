/* eslint-disable react/prop-types */
import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import styles from "./QuickFilter.module.css";

export function FilterIndicator({ value }) {
  return (
    <div className=" absolute -right-3 -top-3 flex h-6 w-6 min-w-min items-center justify-center rounded-full bg-slate-800 px-2 font-mono text-sm text-blue-50">
      {value}
    </div>
  );
}

function QuickFilter({ filterValues, filterLabel }) {
  const [checkedValues, setCheckedValues] = React.useState([]);
  const filterCount = checkedValues.length;

  function addOrRemoveCheck(item) {
    if (checkedValues.includes(item)) {
      const nextItems = checkedValues.filter((a) => a !== item);
      setCheckedValues(nextItems);
    } else {
      const nextItems = [...checkedValues, item];
      setCheckedValues(nextItems);
      console.log(checkedValues);
    }
  }

  // const ref = React.useRef();

  return (
    <>
      <DropdownMenu.Root className="flex justify-center">
        <DropdownMenu.Trigger
          className={`relative flex items-center justify-center gap-1 border-2 border-slate-300 bg-white text-base text-slate-800 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 ${
            filterCount === 0 ? "border-slate-400" : "border-slate-900"
          }`}
        >
          {filterCount === 1 ? checkedValues[0] : filterLabel}
          {filterCount >= 1 && <FilterIndicator value={filterCount} />}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal className="relative">
          <DropdownMenu.Content
            align="start"
            sideOffset={4}
            className={` max-h-[320px] min-w-[320px] overflow-scroll border border-slate-300 bg-white p-0 text-slate-800 shadow-sm ${styles.DropdownMenuContent}`}
          >
            {filterValues.map((item) => {
              const id = crypto.randomUUID();
              const checked = checkedValues.includes(item);

              return (
                <>
                  <DropdownMenu.CheckboxItem
                    key={id}
                    checked={checked}
                    onSelect={(event) => {
                      event.preventDefault();
                    }}
                    onCheckedChange={() => {
                      addOrRemoveCheck(item);
                    }}
                    className={` gap-2 text-ellipsis px-4 py-6 text-base text-slate-800 data-[highlighted]:bg-slate-50 data-[highlighted]:text-slate-900 ${styles.DropdownMenuCheckboxItem}`}
                  >
                    <DropdownMenu.Group
                      className={`flex h-6  w-6 justify-center border  align-middle ${
                        checked
                          ? "border-blue-600 bg-blue-600 hover:border-blue-700 hover:bg-blue-700"
                          : "border-slate-400 bg-white hover:border-slate-500 hover:bg-white"
                      }`}
                    >
                      <DropdownMenu.ItemIndicator className={`h-6 w-6 `}>
                        <CheckIcon className="h-6 w-6 text-white" />
                      </DropdownMenu.ItemIndicator>
                    </DropdownMenu.Group>
                    {item}
                  </DropdownMenu.CheckboxItem>
                  <DropdownMenu.Separator className=" h-px bg-slate-200" />
                </>
              );
            })}
            <button
              onClick={() => {
                console.log("close the modal from here");
              }}
              className={`sticky bottom-0 box-border flex w-full justify-center rounded-none bg-blue-600 px-3 py-2 align-middle text-base text-white hover:bg-blue-700 
              ${
                filterCount === 0 &&
                "bg-slate-900 text-slate-100 hover:bg-slate-900"
              }`}
            >
              {filterCount === 0
                ? "Close"
                : `Show ${Math.round(Math.random() * 240, 0)} results`}
            </button>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}

export default QuickFilter;
