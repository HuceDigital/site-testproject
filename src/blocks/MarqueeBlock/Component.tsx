"use client";

import React from "react";

import type { MarqueeBlock as MarqueeBlockProps } from "@/payload-types";
import { Marquee } from "@/components/Marquee/Marquee";

export const MarqueeBlock: React.FC<MarqueeBlockProps> = (props) => {
  if (props.type === "style1") {
    return (
      <section className="w-full bg-gradient-to-r from-primaryBlue to-primaryPurple py-8 ">
        <Marquee {...props} />
      </section>
    );
  }
  if (props.type === "style2") {
    return (
      <section className="w-full bg-primaryGray py-8 ">
        <div className="container mx-auto mask-fade-x">

        <Marquee {...props} />
        </div>
      </section>
    );
  }
};
