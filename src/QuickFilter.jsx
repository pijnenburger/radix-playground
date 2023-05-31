/* eslint-disable react/prop-types */
import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import FilterCountIndicator from "./FilterCountIndicator";
import styles from "./QuickFilter.module.css";

function QuickFilter({ filterValues, filterLabel }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkedValues, setCheckedValues] = React.useState([]);
  const filterCount = checkedValues.length;
  const resultCount = checkedValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );

  function addOrRemoveCheck(item) {
    const index = checkedValues.findIndex((obj) => obj.label === item.label);

    if (index !== -1) {
      // Object with the same label exists, remove it
      const nextItems = [...checkedValues];
      nextItems.splice(index, 1);
      // console.log(nextItems);
      setCheckedValues(nextItems);
    } else {
      // Object doesn't exist, add it
      const nextItems = [...checkedValues, item];
      // console.log(nextItems);
      setCheckedValues(nextItems);
    }
  }

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
          <FilterCountIndicator value={filterCount} />
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
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className=" flex max-h-[320px] min-w-[320px] flex-col overflow-clip rounded-md border border-slate-300 bg-white p-0 text-slate-800 shadow-xl"
        >
          <div id="scroll-container" className="flex-grow overflow-scroll">
            {filterValues.map((item) => {
              const id = crypto.randomUUID();

              // new way of checking if it should be checked
              const index = checkedValues.findIndex(
                (obj) => obj.label === item.label
              );
              const checked = index === -1 ? false : true;

              // Old way of checking if it should be checked
              // const checked = checkedValues.includes(item.label);

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
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className={`box-border flex w-full justify-center rounded-none bg-blue-600 px-3 py-3 align-middle font-sans text-base text-white hover:bg-blue-700 
            ${
              filterCount === 0 &&
              "bg-slate-900 text-slate-100 hover:bg-slate-900"
            }`}
          >
            {filterCount === 0 ? "Close" : `Show ${resultCount} results`}
          </button>
          <DropdownMenu.Arrow className=" h-[8px] w-[16px] fill-slate-300 stroke-slate-300" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default QuickFilter;
