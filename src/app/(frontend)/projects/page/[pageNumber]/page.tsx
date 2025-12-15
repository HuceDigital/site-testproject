import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React, { Suspense } from "react";
import PageClient from "./page.client";
import { notFound } from "next/navigation";

export const revalidate = 600;

type Args = {
  params: Promise<{
    pageNumber: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise;
  const payload = await getPayload({ config: configPromise });

  const sanitizedPageNumber = Number(pageNumber);

  if (!Number.isInteger(sanitizedPageNumber)) notFound();

  const projects = await payload.find({
    collection: "projects",
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
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
    <div className="pt-24 pb-24 min-h-screen">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Projects</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="projects"
          currentPage={projects.page}
          limit={12}
          totalDocs={projects.totalDocs}
        />
      </div>

      <Suspense fallback={<div className="container">Loading projects...</div>}>
        <CollectionArchive projects={projects.docs} relationTo="projects" />
      </Suspense>

      <div className="container">
        {projects?.page && projects?.totalPages > 1 && (
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

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const { totalDocs } = await payload.count({
    collection: "projects",
    overrideAccess: false,
  });

  const totalPages = Math.ceil(totalDocs / 10);

  const pages: { pageNumber: string }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) });
  }

  return pages;
}
