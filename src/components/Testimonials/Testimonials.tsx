"use client";

import { FC, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    category: "category one",
    title: "Service one",
    image: "/banner.jpeg",
  },
  {
    id: 2,
    category: "category one",
    title: "Service one",
    image: "/banner.jpeg",
  },
  {
    id: 3,
    category: "category one",
    title: "Service one",
    image: "/banner.jpeg",
  },
  {
    id: 4,
    category: "category one",
    title: "Service one",
    image: "/banner.jpeg",
  },
  {
    id: 5,
    category: "category one",
    title: "Service one",
    image: "/banner.jpeg",
  },
  {
    id: 6,
    category: "category one",
    title: "Service one",
    image: "/banner.jpeg",
  },
];

interface TestimonialCardProps {
  rating: number;
}

const Rating = ({ rating }: { rating: number }) => {
  if (rating > 5) {
    rating = 5;
  }

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < rating) {
          return (
            <div key={index} className="bg-primaryBlue rounded-md p-1">
              <Star className="w-6 h-6" fill="yellow" stroke="0" />
            </div>
          );
        } else {
          return (
            <div key={index} className="bg-primaryBlue rounded-md p-1">
              <Star className="w-6 h-6" />
            </div>
          );
        }
      })}
    </div>
  );
};

const TestimonialCard: FC<TestimonialCardProps> = ({ rating }) => {
  return (
    <div className="p-8 bg-custom-gradient  shadow-lg max-w-[600px] text-center text-primaryGray flex flex-col gap-4 justify-center items-center relative rounded-xl ">
      <div className="absolute bottom-4 left-0 text-primaryBlue">
        <div className="relative w-16  md:w-20  h-32 md:h-36 overflow-hidden rounded-br-[200px] rounded-tl-[100px] rounded-tr-[100px] ">
          <Image
            src="/banner.jpeg"
            alt="Rounded Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative px-10 ">
        <Quote className="absolute top-0 left-0 w-8 h-8 text-primaryBlue fill-primaryBlue" />
        <h3 className="text-2xl">
          Working with acme corp has been the best decision we have ever made
        </h3>
        <Quote className="absolute bottom-0 right-0 w-8 h-8 text-primaryBlue fill-primaryBlue" />
      </div>
      <span>
        <p className="text-xl">John Doe,</p>
        <p>CEO, Acme Corp</p>
      </span>
      <Rating rating={rating} />
      <Link className="underline text-xl mt-8" href="#">
        View Project
      </Link>
    </div>
  );
};

export const Testimomials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavigation = (direction: "left" | "right") => {
    setActiveIndex((prev) => {
      if (direction === "left") {
        return prev === 0 ? services.length - 1 : prev - 1;
      }
      return prev === services.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="pb-16  w-full">
      <h2 className="text-center text-5xl font-sans text-slate-900">
        What people say
      </h2>

      <div className="relative mx-auto max-w-[1200px] h-[600px] md:h-[500px] ">
        <div className="relative h-full flex items-center justify-center overflow-hidden">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const isPrev =
              index === (activeIndex - 1 + services.length) % services.length;
            const isNext = index === (activeIndex + 1) % services.length;

            if (!isActive && !isPrev && !isNext) return null;

            return (
              <motion.div
                key={service.id}
                className="absolute w-full max-w-[550px] "
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.9,
                  zIndex: isActive ? 2 : 1,
                  x: isActive ? 0 : isPrev ? -200 : 200,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <TestimonialCard rating={4} />
              </motion.div>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            onClick={() => handleNavigation("left")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => handleNavigation("right")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
