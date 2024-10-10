"use client";

import { Clock } from "lucide-react";
import * as React from "react";

import { Label } from "@/components/ui/label";

import { TimePickerInput } from "./time-picker-input";

type TimePickerProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label className="text-xs" htmlFor="hours">
          Hours
        </Label>
        <TimePickerInput
          ref={hourRef}
          date={date}
          picker="hours"
          setDate={setDate}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label className="text-xs" htmlFor="minutes">
          Minutes
        </Label>
        <TimePickerInput
          ref={minuteRef}
          date={date}
          picker="minutes"
          setDate={setDate}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
