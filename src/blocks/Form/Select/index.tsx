import type { SelectField } from "@payloadcms/plugin-form-builder/types";
import type { Control, FieldErrorsImpl } from "react-hook-form";

import { Label } from "@/components/ui/label";
import React, { useState, useRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import { ChevronDown, Check } from "lucide-react";

import { Error } from "../Error";
import { Width } from "../Width";

export const Select: React.FC<
  SelectField & {
    control: Control;
    errors: Partial<FieldErrorsImpl>;
  }
> = ({ name, control, errors, label, options, required, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Width width={width}>
      <Label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options.find((t) => t.value === value);
          const displayValue = controlledValue?.label || "";

          return (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 flex items-center justify-between bg-white"
                onClick={() => setIsOpen(!isOpen)}
                id={name}
              >
                <span
                  className={displayValue ? "text-gray-900" : "text-gray-500"}
                >
                  {displayValue || label}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="absolute z-[999999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {options.map(({ label: optionLabel, value: optionValue }) => (
                    <button
                      key={optionValue}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                      onClick={() => {
                        onChange(optionValue);
                        setSelectedValue(optionValue);
                        setIsOpen(false);
                      }}
                    >
                      <span>{optionLabel}</span>
                      {value === optionValue && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        }}
        rules={{ required }}
      />
      {errors[name] && <Error />}
    </Width>
  );
};
