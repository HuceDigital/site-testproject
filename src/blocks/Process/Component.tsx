import React from "react";
import type { ProcessBlock as ProcessProps } from "@/payload-types";
import { Media } from "@/components/Media";

export const ProcessBlock: React.FC<ProcessProps> = ({
  title,
  steps,
  type,
}) => {
  if (type === "style1") {
    return (
      <section>
        <div>
          <h2 className="text-4xl md:text-6xl  mb-16 text-center font-sans">
            {title}
          </h2>

          <div className="grid lg:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <div key={index} className="relative ">
                <div className="flex flex-col items-center">
                  {/* Image only for style1 */}
                  <div className="relative w-full flex justify-center mb-4">
                    {step.media && (
                      <div className="relative w-32 h-32 -mb-6 z-10">
                        <Media
                          resource={step.media}
                          fill
                          className="object-cover rounded-full border-4 border-white shadow-md"
                          size="33vw"
                          priority
                        />
                      </div>
                    )}
                  </div>
                  <div className="bg-primaryGray p-6 w-full rounded-lg shadow-sm relative">
                    <div
                      className="absolute -top-6 -left-2 md:-left-6 w-16 h-16 flex items-center justify-center text-white text-3xl font-bold rounded-lg shadow-md"
                      style={{ backgroundColor: step.color || "#000000" }}
                    >
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-center mt-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "style2") {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl mb-16 text-center font-sans">
            {title}
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {/* Black numbered square */}
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-3xl font-bold mb-6"
                  style={{ backgroundColor: step.color || "#000000" }}
                >
                  {index + 1}
                </div>

                {/* Step title */}
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};
