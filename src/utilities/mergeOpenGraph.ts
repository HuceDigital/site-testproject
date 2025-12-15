import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description: "Beveiliging met een persoonlijke aanpak",
  images: [
    {
      url: `${getServerSideURL()}/elanto-OG.png`,
    },
  ],
  siteName: "Elanto",
  title: "Elanto",
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
