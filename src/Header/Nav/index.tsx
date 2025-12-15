"use client";

import React from "react";

import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { DropdownNav } from "./DropdownNav";
import { MobileNav } from "./MobileNav";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  // Process the navItems to ensure uniqueness for desktop navigation
  const processedNavItems = React.useMemo(() => {
    const items = data?.navItems || [];
    return items.filter(
      (item) =>
        item &&
        (item.type === "link" ||
          item.type === "dropdown" ||
          item.type === "button"),
    );
  }, [data?.navItems]);

  // Prepare a cleaned version of the data for mobile navigation
  const mobileNavData = React.useMemo(() => {
    if (!data) return { id: 0, navItems: [] };

    // Create a deep copy of the data object
    const cleanedData = {
      ...data,
      navItems: data.navItems ? [...data.navItems] : [],
    };

    return cleanedData;
  }, [data]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-6 items-center w-full justify-end md:justify-between font-[family-name:var(--font-open-sans)]">
        {processedNavItems.map((item, i) => {
          if (!item || (!item.type && !item.link)) return null;

          if (
            item.type === "dropdown" &&
            item.dropdownItems &&
            item.dropdownItems.length > 0
          ) {
            return (
              <DropdownNav
                key={i}
                label={item.label || ""}
                items={item.dropdownItems}
              />
            );
          }

          if (item.type === "link" && item.link) {
            return (
              <CMSLink
                key={i}
                {...item.link}
                appearance="link"
                size="lg"
                className="text-lg"
              />
            );
          }

          if (item.type === "button" && item.link) {
            return (
              <CMSLink
                key={i}
                {...item.link}
                appearance="cta"
                size="lg"
              />
            );
          }

          return null;
        })}
      </nav>

      {/* Mobile Navigation */}
      <MobileNav data={mobileNavData} />
    </>
  );
};
