"use client";

import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  forwardRef,
  useState,
} from "react";
import { Plus, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type InputTagsProps = {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
} & ComponentProps<"input">;

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <>
        <div className="flex">
          <div className="flex h-10 w-full items-center pr-2 rounded-md border border-gray-200 transition duration-500 ease-linear focus-within:border-gray-500 focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50">
            <Input
              value={pendingDataPoint}
              onChange={(e) => setPendingDataPoint(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPendingDataPoint();
                } else if (e.key === "," || e.key === " ") {
                  e.preventDefault();
                  addPendingDataPoint();
                }
              }}
              className="w-full bg-transparent border-none font-normal shadow-none outline-none focus:outline-none focus-visible:ring-0 pr-1"
              {...props}
              ref={ref}
            />

            <Button
              type="button"
              variant="link"
              className="p-1 group-focus-within:text-[#bec1c6]"
              onClick={addPendingDataPoint}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
        {value?.length !== 0 && (
          <div className="border rounded-md min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
            {value?.map((item, idx) => (
              <Badge key={idx} variant="secondary">
                {item}
                <button
                  type="button"
                  className="w-3 ml-2"
                  onClick={() => {
                    onChange(value.filter((i) => i !== item));
                  }}
                >
                  <XIcon className="w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </>
    );
  }
);
InputTags.displayName = "InputTags";

export { InputTags };
