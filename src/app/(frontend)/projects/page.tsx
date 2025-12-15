import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/CollectionArchive";
import { Pagination } from "@/components/Pagination";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React, { Suspense } from "react";
import PageClient from "./page.client";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  const projects = await payload.find({
    collection: "projects",
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      beforeImage: true,
      afterImage: true,
    },
  });

  return (
    <div className="pb-24 pt-24 col-span-12 row-start-2 container min-h-screen">
      <PageClient />

      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-5xl mb-6  text-black font-sans">
          Recente Projecten
        </h1>
      </div>

      {/* todo: figure out if we want this */}
      {/* <div className="container mb-8">
        <PageRange
          collection="projects"
          currentPage={projects.page}
          limit={1}
          totalDocs={projects.totalDocs}
        />
      </div> */}

      <Suspense fallback={<div className="container">Loading projects...</div>}>
        <CollectionArchive
          projects={projects.docs}
          relationTo="projects"
          withFilter
          layout="grid"
        />
      </Suspense>

      <div className="container">
        {projects.totalPages > 1 && projects.page && (
          <Pagination page={projects.page} totalPages={projects.totalPages} />
        )}
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Elanto Projects`,
  };
}
