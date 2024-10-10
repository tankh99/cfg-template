import type { ControllerRenderProps, FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import type { FormInputProps } from "./form-types";

export type FormCheckboxesProps = FormInputProps & {
  description?: string;
  // The string that indexes the object's label, e.g. name
  optionLabelKey: string;
  // The string that indexes the object's value, e.g. id
  optionValueKey: string;
  options: Array<Record<string, string>>;
};

export function FormCheckboxes(props: FormCheckboxesProps) {
  const {
    form,
    name,
    label,
    description,
    options,
    optionLabelKey,
    optionValueKey,
  } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<FieldValues>;
      }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <FormControl>
            <div className="flex flex-col space-y-4">
              {options
                ? options.map((option) => {
                    const optionValue = option[optionValueKey];
                    const optionLabel = option[optionLabelKey];
                    const id = `${optionValue}-${optionLabel}`;

                    return (
                      <div key={option[optionLabelKey]} className="flex space-x-2">
                        <Checkbox
                          checked={field.value?.some(
                            (opt: Record<string, string>) => opt[optionValueKey] === optionValue,
                          )}
                          id={id}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              // if checked, add it to the value array
                              field.onChange(
                                field.value?.concat({
                                  [optionValueKey]: optionValue,
                                  isOption: true,
                                  [optionLabelKey]: optionLabel,
                                } as Record<string, string>),
                              );
                            } else {
                              // if unchecked, remove it from the value array
                              field.onChange(
                                field.value.filter((opt: Record<string, string>) => {
                                  return opt[optionValueKey] !== optionValue;
                                }),
                              );
                            }
                          }}
                        />
                        <Label htmlFor={id}>{optionLabel}</Label>
                      </div>
                    );
                  })
                : []}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
