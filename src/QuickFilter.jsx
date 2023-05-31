/* eslint-disable react/prop-types */
import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./QuickFilter.module.css";

export function FilterIndicator({ value }) {
  // const toprightStyle = "absolute -right-3 -top-3 z-10 h-6 w-6 text-sm";
  const inlineStyle = "h-[20px] w-[20px] text-xs";

  return (
    <div
      className={`${inlineStyle} flex items-center justify-center rounded-full bg-slate-800 px-2 font-mono text-blue-50`}
    >
      {value}
    </div>
  );
}

function QuickFilter({ filterValues, filterLabel }) {
  const [checkedValues, setCheckedValues] = React.useState([]);
  const filterCount = checkedValues.length;

  function addOrRemoveCheck(item) {
    // Complex function looking at label & count. Currently not working...
    const itemExists = checkedValues.some((checkedItem) => {
      return (
        checkedItem.label === item.label && checkedItem.count === item.count
      );
    });
    console.log(item);
    console.log(itemExists);

    // Simple function checking labels only
    if (checkedValues.includes(item.label)) {
      const nextItems = checkedValues.filter((a) => a !== item.label);
      setCheckedValues(nextItems);
    } else {
      const nextItems = [...checkedValues, item.label];
      setCheckedValues(nextItems);
    }
  }

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu.Root
      className=" flex justify-center"
      onOpenChange={(event) => {
        setIsOpen(event);
      }}
      open={isOpen}
    >
      <DropdownMenu.Trigger
        className={` relative box-border flex h-[44px] select-none items-center justify-center gap-1 bg-white py-2 pl-4 pr-3 text-base text-slate-800 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 ${
          filterCount === 0
            ? "border border-slate-300"
            : "border-2 border-slate-900"
        }`}
      >
        {/* Show filter count indicator */}
        {/* {filterCount >= 1 && <FilterIndicator value={filterCount} />} */}

        {/* Show first selected value or filter category */}
        {/* {filterCount === 1 ? checkedValues[0] : filterLabel} */}

        {filterLabel}
        {filterCount >= 1 ? (
          <FilterIndicator value={filterCount} />
        ) : (
          <ChevronDownIcon
            width={20}
            height={20}
            className={`${
              isOpen ? "rotate-180" : "rotate-0"
            } h-5 w-5 transform transition-transform will-change-transform`}
          />
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal className="relative">
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className={` max-h-[320px] min-w-[320px] overflow-scroll border border-slate-300 bg-white p-0 text-slate-800 shadow-sm ${styles.DropdownMenuContent}`}
        >
          {filterValues.map((item) => {
            const id = crypto.randomUUID();
            const checked = checkedValues.includes(item.label);

            return (
              <div key={id}>
                <DropdownMenu.CheckboxItem
                  key={`label-${id}`}
                  checked={checked}
                  onSelect={(event) => {
                    event.preventDefault();
                  }}
                  onCheckedChange={() => {
                    addOrRemoveCheck(item);
                  }}
                  className={` flex cursor-pointer flex-row gap-2 text-ellipsis px-4 py-6 font-sans text-base text-slate-800 data-[highlighted]:bg-slate-50 data-[highlighted]:text-slate-900 data-[state=checked]:text-blue-700 ${styles.DropdownMenuCheckboxItem}`}
                >
                  <DropdownMenu.Group
                    className={`flex h-6 w-6 justify-center border align-middle ${
                      checked
                        ? "border-blue-600 bg-blue-600 hover:border-blue-700 hover:bg-blue-700"
                        : "border-slate-400 bg-white hover:border-slate-500 hover:bg-white"
                    }`}
                  >
                    <DropdownMenu.ItemIndicator className={`h-6 w-6 `}>
                      <CheckIcon className="h-6 w-6 text-white" />
                    </DropdownMenu.ItemIndicator>
                  </DropdownMenu.Group>
                  {item.label}
                  <DropdownMenu.Group
                    className="pointer-events-none ml-auto pl-4 font-mono text-sm text-slate-500"
                    key={`count-${id}`}
                  >
                    {item.count}
                  </DropdownMenu.Group>
                </DropdownMenu.CheckboxItem>
                <DropdownMenu.Separator className=" h-px bg-slate-200" />
              </div>
            );
          })}
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className={`sticky bottom-0 box-border flex w-full justify-center rounded-none bg-blue-600 px-3 py-3 align-middle font-sans text-base text-white hover:bg-blue-700 
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
  );
}

export default QuickFilter;
