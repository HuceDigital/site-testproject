"use client";
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { Number } from "../Number";
import { Label } from "@/components/ui/label";

interface ConditionalMeasurementProps {
  control: any;
  register: any;
  errors: any;
  form: any;
}

export const ConditionalMeasurement: React.FC<ConditionalMeasurementProps> = ({
  control,
  register,
  errors,
  form,
}) => {
  const [showMeasurementFields, setShowMeasurementFields] = useState(false);
  const [windowArea, setWindowArea] = useState<number>(0);

  // Watch the service field to show/hide measurement fields
  const selectedService = useWatch({
    control,
    name: "service",
  });

  // Watch the measurement fields to calculate area
  const windowWidth = useWatch({
    control,
    name: "windowWidth",
  });

  const windowHeight = useWatch({
    control,
    name: "windowHeight",
  });

  useEffect(() => {
    console.log("Selected service:", selectedService);
    setShowMeasurementFields(selectedService === "glaswerk");
  }, [selectedService]);

  useEffect(() => {
    if (windowWidth && windowHeight) {
      // Convert from cm to m for calculation (divide by 100)
      const widthInMeters = parseFloat(windowWidth) / 100;
      const heightInMeters = parseFloat(windowHeight) / 100;
      const area = widthInMeters * heightInMeters;
      setWindowArea(area);
    } else {
      setWindowArea(0);
    }
  }, [windowWidth, windowHeight]);

  if (!showMeasurementFields) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <Label className="text-lg font-semibold text-blue-800">
        Window Measurements (Required for Glaswerk)
      </Label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Number
          name="windowWidth"
          label="Window Width (cm)"
          required={true}
          width={100}
          register={register}
          errors={errors}
          blockType={"text"}
        />

        <Number
          name="windowHeight"
          label="Window Height (cm)"
          required={true}
          width={100}
          register={register}
          errors={errors}
          blockType={"text"}
        />
      </div>

      {/* Area Calculation and Validation */}
      {windowArea > 0 && (
        <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Calculated Area: {windowArea.toFixed(2)} m² (
              {(windowArea * 10000).toFixed(0)} cm²)
            </span>
            {windowArea < 0.65 && (
              <span className="text-red-600 font-semibold text-sm">
                ⚠️ Minimum 0.65m² (6,500 cm²) required
              </span>
            )}
            {windowArea >= 0.65 && (
              <span className="text-green-600 font-semibold text-sm">
                ✓ Area meets minimum requirement
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
