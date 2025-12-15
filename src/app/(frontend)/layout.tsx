import type { Metadata } from "next";

import { cn } from "@/utilities/ui";
import React from "react";

import { Header } from "@/Header/Component";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
// import { draftMode } from 'next/headers'

import "./globals.css";
import { getServerSideURL } from "@/utilities/getURL";
import { Logo } from "@/components/Logo/Logo";
import { Footer } from "@/Footer/Component";
import { TopBar } from "@/Header/TopBar";

import { openSans, inter } from "../fonts";
import Link from "next/link";
import { WhatsAppWithPopup } from "@/components/WhatsApp/WhatsAppWithPopup";
import { getWhatsAppSettings } from "@/utilities/getWhatsAppSettings";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { isEnabled } = await draftMode()

  // Fetch WhatsApp settings server-side
  const whatsappSettings = await getWhatsAppSettings();

  return (
    <html
      className={cn(
        openSans.variable,
        inter.variable
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}

          <div className="grid grid-cols-12 auto-rows-auto ">
            {/* Sticky Header Container */}
            <div className="col-span-12 sticky top-0 z-50">
              {/* Full-width Top Bar */}
              <TopBar />
              <div className="flex relative z-20 bg-white shadow-sm py-2 ">
                <div className="container mx-auto flex items-center gap-6 lg:gap-48" >
                  <div className="flex justify-center items-center max-w-60">
                    <Link href="/">
                      <Logo loading="eager" priority="high" />
                    </Link>
                  </div>

                  <Header />
                </div>
              </div>
            </div>

            {children}

            <div className="col-span-12">
              <Footer />
            </div>
          </div>

          {/* WhatsApp Integration */}
          <WhatsAppWithPopup settings={whatsappSettings} />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  // twitter: {
  //   card: 'summary_large_image',
  //   creator: '@Huce',
  // },
};
