"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ClientLink } from "@/components/Link/ClientLink";
import type { Header as HeaderType } from "@/payload-types";
import { CMSLink } from "@/components/Link";

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>(
    {}
  );

  // Create a clean version of the navigation items
  const navItems = React.useMemo(() => {
    const items = data?.navItems || [];

    // Return only valid items (excluding buttons, which are rendered separately)
    return items.filter(
      (item) =>
        item &&
        ((item.type === "dropdown" &&
          item.label &&
          item.dropdownItems?.length) ||
          (item.type === "link" && item.link))
    );
  }, [data]);

  // Extract button items to render separately in the header
  const buttonItems = React.useMemo(() => {
    const items = data?.navItems || [];
    return items.filter(
      (item) => item && item.type === "button" && item.link
    );
  }, [data]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden font-[family-name:var(--font-open-sans)]">
      <div className="flex items-center gap-6">
        {/* Button items - visible in header */}
        {buttonItems.map((item, i) => (
          <CMSLink
                key={i}
                {...item.link}
                appearance="cta"
                size="sm"
              />
        ))}
        
        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="text-xl font-bold text-primaryBlue">Menu</div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-4">
            {navItems.map((item, i) => (
              <li
                key={i}
                className="border-b border-gray-100 pb-4 last:border-0"
              >
                {item.type === "dropdown" && item.dropdownItems ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(i)}
                      className="flex items-center justify-between w-full py-2 text-left font-medium"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          openDropdowns[i] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`mt-2 pl-4 space-y-2 overflow-hidden transition-all duration-300 ${
                        openDropdowns[i]
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {/* Get unique dropdown items */}
                      {item.dropdownItems.map((dropdownItem, j) => (
                        <div key={j} className="py-2">
                          <ClientLink
                            {...dropdownItem.link}
                            appearance="inline"
                            className="block w-full text-gray-600 hover:text-primaryBlue py-1"
                            onNavigate={handleNavigation}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : item.type === "link" && item.link ? (
                  <ClientLink
                    {...item.link}
                    appearance="inline"
                    className="block py-2 font-medium"
                    onNavigate={handleNavigation}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
