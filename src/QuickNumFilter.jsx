import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Form from "@radix-ui/react-form";
import * as Slider from "@radix-ui/react-slider";

import { ChevronDownIcon } from "@radix-ui/react-icons";

function QuickNumFilter({ filterLabel }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [filterApplied, setFilterApplied] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  function validateOnBlur() {
    if (maxPrice < minPrice && maxPrice !== "") {
      // setMaxPrice(parseInt(minPrice) + 1);
      setDisabled(true);
      setFilterApplied(false);
    }

    if (minPrice === "" && maxPrice === "") {
      setDisabled(false);
      setFilterApplied(false);
    } else {
      setDisabled(false);
      setFilterApplied(true);
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
          !filterApplied
            ? "border border-slate-300"
            : "border-2 border-slate-900"
        }`}
      >
        {filterLabel}
        {/* {!filterApplied && filterLabel}
        {filterApplied &&
          minPrice !== "" &&
          maxPrice === "" &&
          `More than € ${minPrice}`}
        {filterApplied &&
          minPrice === "" &&
          maxPrice !== "" &&
          `Up to € ${maxPrice}`}
        {filterApplied &&
          minPrice !== "" &&
          maxPrice !== "" &&
          `€ ${minPrice} - € ${maxPrice}`} */}
        <ChevronDownIcon
          width={20}
          height={20}
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } h-5 w-5 transform transition-transform will-change-transform`}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className=" flex max-h-[320px] min-w-[320px] max-w-[400px] flex-col overflow-clip rounded-md border border-slate-300 bg-white p-0 text-slate-800 shadow-xl"
        >
          <div id="container" className="flex-grow">
            <Form.Root className="w-full">
              <div className="flex gap-4 p-6">
                {/* Mininum price input field */}
                <Form.Field className="flex flex-col gap-2" name="min_price">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="font-sans text-base text-slate-900">
                      From
                    </Form.Label>
                    {/* {minPrice !== "" && (
                      <button
                        onClick={() => {
                          setMinPrice("");
                        }}
                        className="flex h-fit justify-center rounded-none border-none bg-transparent p-0 align-middle font-sans text-base text-blue-500"
                      >
                        clear
                      </button>
                    )} */}
                  </div>
                  <div className="relative">
                    <Form.Control asChild>
                      <input
                        className="box-border inline-flex h-[40px] w-full appearance-none items-center justify-center rounded border bg-slate-100 pl-8 pr-2 font-sans text-base leading-none text-slate-900 outline-none selection:bg-blue-600 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                        type="number"
                        step={1}
                        value={minPrice}
                        // max={maxPrice}
                        placeholder="No min"
                        onChange={(e) => setMinPrice(e.target.value)}
                        onBlur={validateOnBlur}
                        required
                      />
                    </Form.Control>
                    <span className="absolute bottom-0 left-0 z-10 inline-flex h-[40px] items-center justify-center px-2 font-sans text-base text-slate-500">
                      €
                    </span>
                  </div>
                  <Form.Message
                    className=" text-sm text-red-700"
                    match="rangeOverflow"
                  >
                    Min should be lower than max
                  </Form.Message>
                </Form.Field>

                {/* Maximum price input field */}
                <Form.Field className="flex flex-col gap-2" name="max_price">
                  <div className="flex items-center justify-between">
                    <Form.Label className="font-sans text-base font-medium text-slate-900">
                      To
                    </Form.Label>
                  </div>
                  <div className="relative">
                    <Form.Control asChild>
                      <input
                        className="box-border inline-flex h-[40px] w-full appearance-none items-center justify-center rounded border bg-slate-100 pl-8 pr-2 font-sans text-base leading-none text-slate-900 outline-none selection:bg-blue-600 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                        type="number"
                        step={1}
                        value={maxPrice}
                        min={minPrice}
                        placeholder="No max"
                        onChange={(e) => setMaxPrice(e.target.value)}
                        onBlur={validateOnBlur}
                        required
                      />
                    </Form.Control>
                    <span className="absolute bottom-0 left-0 z-10 inline-flex h-[40px] items-center justify-center px-2 font-sans text-base text-slate-500">
                      €
                    </span>
                  </div>
                  <Form.Message
                    className="text-sm text-red-700"
                    match="rangeUnderflow"
                  >
                    Max should be higher than min
                  </Form.Message>
                </Form.Field>
              </div>

              {/* Slider */}
              {/* <Slider.Root
                defaultValue={[25, 75]}
                step={10}
                minStepsBetweenThumbs={1}
                className="relative flex h-5 w-[200px] touch-none select-none items-center"
              >
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb className=" block" />
                <Slider.Thumb />
              </Slider.Root> */}
              <Form.Submit
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsOpen(false);

                  if ((minPrice !== "") | (maxPrice !== "")) {
                    setFilterApplied(true);
                  }
                  // setFilterApplied((currentValue) => !currentValue);
                }}
                asChild
              >
                <button
                  disabled={disabled}
                  onClick={(event) => {
                    event.preventDefault();
                    setIsOpen(false);

                    if ((minPrice !== "") | (maxPrice !== "")) {
                      // setFilterApplied(true);
                    }
                    // setFilterApplied((currentValue) => !currentValue);
                  }}
                  className={` box-border flex w-full justify-center rounded-none bg-blue-600 px-3 py-3 align-middle font-sans text-base text-white hover:bg-blue-700 
            ${
              !filterApplied && "bg-slate-900 text-slate-100 hover:bg-slate-900"
            }`}
                >
                  {/* {!filterApplied ? "Close" : `Show 1248 results`} */}
                  Apply
                </button>
              </Form.Submit>
            </Form.Root>
          </div>
          <DropdownMenu.Arrow className=" h-[8px] w-[16px] fill-slate-300 stroke-slate-300" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default QuickNumFilter;
