import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import type { CalendarProps } from "@/components/ui/calendar";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { FormInputProps } from "./form-types";

type FormDateInputProps = FormInputProps & {
  calendarProps?: CalendarProps;
  description?: string;
};

export function FormDatePicker(props: FormDateInputProps) {
  const { form, name, label, description, placeholder, calendarProps } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const value =
          typeof field.value === "string" ? new Date(field.value) : field.value;

        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
            <Popover>
              <PopoverTrigger asChild={true}>
                <FormControl>
                  <Button
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-500",
                    )}
                    variant="outline"
                  >
                    {field.value ? (
                      format(value, "PPP")
                    ) : (
                      <span>{placeholder ?? "Select a date"}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0 bg-white">
                <Calendar
                  captionLayout="dropdown-buttons"
                  initialFocus={true}
                  mode="single" // Defaults to single, but can be overridden
                  selected={value}
                  onSelect={field.onChange}
                  {...calendarProps}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
