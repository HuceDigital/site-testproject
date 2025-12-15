import React from "react";

import type { Header } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export async function TopBar() {
  const headerData: Header = await getCachedGlobal("header", 1)();

  const enabled = headerData?.topBar && (headerData.topBar as any).enabled;
  const email = headerData?.topBar && (headerData.topBar as any).email;
  const phone = headerData?.topBar && (headerData.topBar as any).phone;

  if (!enabled || (!email && !phone)) return null;

  return (
    <div className="bg-gray-100 text-gray-600 text-sm w-full">
      <div className="w-full flex justify-end items-center py-1 pr-4 gap-4">
        {email && (
          <a href={`mailto:${email as string}`} className="hover:text-gray-800">
            {email as string}
          </a>
        )}
        {phone && (
          <a
            href={`tel:${String(phone).replace(/\s+/g, "")}`}
            className="hover:text-gray-800"
          >
            {phone as string}
          </a>
        )}
      </div>
    </div>
  );
}
