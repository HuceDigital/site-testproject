"use client";
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { Number } from "../Number";
import { Text } from "../Text";
import { Select } from "../Select";
import { Textarea } from "../Textarea";
import { Email } from "../Email";
import { Label } from "@/components/ui/label";

interface ConditionalFieldsProps {
  control: any;
  register: any;
  errors: any;
}

export const ConditionalFields: React.FC<ConditionalFieldsProps> = ({
  control,
  register,
  errors,
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

  return (
    <div className="space-y-6">
      {/* First Name */}
      <Text
        blockType="text"
        name="firstName"
        label="First Name"
        required={true}
        width={50}
        register={register}
        errors={errors}
      />

      {/* Last Name */}
      <Text
        blockType="text"
        name="lastName"
        label="Last Name"
        required={true}
        width={50}
        register={register}
        errors={errors}
      />

      {/* Email */}
      <Email
        blockType="email"
        name="email"
        label="Email"
        required={true}
        width={50}
        register={register}
        errors={errors}
      />

      {/* Phone */}
      <Text
        blockType="text"
        name="phone"
        label="Phone Number"
        required={true}
        width={50}
        register={register}
        errors={errors}
      />

      {/* Service Selection */}
      <Select
        blockType="select"
        name="service"
        label="Service"
        required={true}
        width={100}
        control={control}
        errors={errors}
        options={[
          { label: "Schilderwerk", value: "schilderwerk" },
          { label: "Kitwerk", value: "kitwerk" },
          { label: "Glaswerk", value: "glaswerk" },
        ]}
      />

      {/* Conditional Measurement Fields for Glaswerk */}
      {showMeasurementFields && (
        <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Label className="text-lg font-semibold text-blue-800">
            Window Measurements (Required for Glaswerk)
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Number
              blockType="text"
              name="windowWidth"
              label="Window Width (cm)"
              required={true}
              width={100}
              register={register}
              errors={errors}
            />

            <Number
              blockType="text"
              name="windowHeight"
              label="Window Height (cm)"
              required={true}
              width={100}
              register={register}
              errors={errors}
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
      )}

      {/* Subject */}
      <Text
        blockType="text"
        name="subject"
        label="Subject"
        required={true}
        width={100}
        register={register}
        errors={errors}
      />

      {/* Message */}
      <Textarea
        blockType="text"
        name="message"
        label="Message"
        required={true}
        width={100}
        register={register}
        errors={errors}
      />
    </div>
  );
};
