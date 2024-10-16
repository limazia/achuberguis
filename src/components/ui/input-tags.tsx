"use client";

import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  forwardRef,
  useState,
} from "react";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type InputTagsProps = {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  disabled?: boolean;
  limit?: number;
} & ComponentProps<"input">;

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value = [], onChange, disabled, limit, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");

    const addPendingDataPoint = () => {
      if (pendingDataPoint.trim() && (!limit || value.length < limit)) {
        const newDataPoints = new Set([...value, pendingDataPoint.trim()]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <>
        <div className="flex">
          <div className="flex h-11 w-full items-center pr-2 rounded-md border border-gray-200 transition duration-500 ease-linear focus-within:border-gray-500 focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50">
            <Input
              value={pendingDataPoint}
              onChange={(e) => setPendingDataPoint(e.target.value)}
              onKeyDown={(e) => {
                if (
                  (e.key === "Enter" || e.key === "," ) && 
                  (!limit || value.length < limit)
                ) {
                  e.preventDefault();
                  addPendingDataPoint();
                }
              }}
              className="w-full bg-transparent border-none font-normal shadow-none outline-none focus:outline-none focus-visible:ring-0 pr-1"
              disabled={disabled}
              {...props}
              ref={ref}
            />

            <Button
              type="button"
              variant="link"
              className="p-1 group-focus-within:text-[#bec1c6]"
              onClick={addPendingDataPoint}
              disabled={
                disabled || (limit && value.length >= limit ? true : false)
              }
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
        {value.length !== 0 && (
          <div className="min-h-11 h-auto border rounded-md p-2 flex gap-2 flex-wrap items-center mt-2">
            {value.map((item, idx) => (
              <Badge key={idx} variant="secondary" className="rounded-md">
                {item}
                <button
                  type="button"
                  className="w-3 ml-2"
                  onClick={() => {
                    onChange(value.filter((i) => i !== item));
                  }}
                >
                  <X className="w-3" />
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
