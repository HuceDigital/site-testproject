import { getCachedGlobal } from "@/utilities/getGlobals";
import React from "react";
import type { Footer } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { Icon } from "@/components/Icon";
import { WhatsAppContact } from "@/components/WhatsApp/WhatsAppContact";

const createStars = (rating: number) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    return i < rating ? "★" : "☆";
  });
  return stars.join("");
};

export async function Footer() {
  const footerData: Footer = await getCachedGlobal("footer", 1)();

  const navItems = footerData?.navItems || [];

  return (
    <footer className="bg-primaryBlue text-white py-16 px-8 w-full">
      <div className=" flex flex-col lg:flex-row justify-between gap-12 container mx-auto">
        {/* Opening Hours Section */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-6 tracking-wide">
            OPENINGSTIJDEN
          </h2>
          <div className="space-y-3">
            {footerData?.timeTable?.map((timeTable) => {
              return (
                <div className="flex gap-8" key={timeTable.day}>
                  <span className="min-w-[100px]">{timeTable.day}</span>
                  <span className="text-white/90">
                    {timeTable.availability === "open"
                      ? `${timeTable.openTime} - ${timeTable.closeTime} uur`
                      : timeTable.availability === "gesloten"
                        ? "Gesloten"
                        : "Op afspraak"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Find Us Section */}
          <div className="mt-16 hidden lg:block">
            <h3 className="text-xl mb-4">Vind ons op</h3>
            <div className="flex gap-4">
              {footerData?.socials?.map((social) => {
                if (!social.social || !social.link) return null;
                return (
                  <a
                    href={social.link || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={social.id}
                    className="hover:opacity-80 transition-opacity"
                    aria-label={social.social}
                  >
                    <Icon name={social.social} className="w-8 h-8" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-6 tracking-wide">
            NAVIGATIE
          </h2>
          {navItems.length > 0 && (
            <nav className="flex flex-col gap-3">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="text-white hover:text-white/80 transition-colors text-lg"
                    key={i}
                    {...link}
                  />
                );
              })}
            </nav>
          )}
        </div>

        {/* Contact Section */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-6 tracking-wide">CONTACT</h2>
          <div className="space-y-2 text-lg">
            {footerData?.contact?.email && (
              <p>
                E-mail:{" "}
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="hover:underline"
                >
                  {footerData.contact.email}
                </a>
              </p>
            )}
            {footerData?.contact?.phone && <p>{footerData.contact.phone}</p>}
            {footerData?.contact?.kvk && <p>KVK: {footerData.contact.kvk}</p>}
          </div>

          {/* Badge/Logo */}
          <div className="mt-12 self-end flex lg:justify-center">
            <div className="w-40 h-40 lg:w-72 lg:h-72">
              <img
                src={"/betereschilder.png"}
                alt="De Betere Schilder"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Find Us Section */}
        <div className="lg:hidden">
          <h3 className="text-xl mb-4">Vind ons op</h3>
          <div className="flex gap-4">
            {footerData?.socials?.map((social) => {
              if (!social.social || !social.link) return null;
              return (
                <a
                  href={social.link || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={social.id}
                  className="hover:opacity-80 transition-opacity"
                  aria-label={social.social}
                >
                  <Icon name={social.social} className="w-8 h-8" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
