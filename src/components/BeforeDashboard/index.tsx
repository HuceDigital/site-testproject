"use client";

import { Banner } from "@payloadcms/ui/elements/Banner";
import React from "react";

import { SeedButton } from "./SeedButton";
import "./index.scss";

const baseClass = "before-dashboard";

const BeforeDashboard: React.FC = () => {
  // if (process.env.NODE_ENV === 'production' && process.env.ENABLE_SEEDING === 'false') {
  //   return null
  // }

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>
          Welcome to your dashboard!, The Huce team wishes you happy editing!
        </h4>
        <p>
          When you are experiencing issues, please feel free to reach out and we
          will get you back to editing in no time!
        </p>
      </Banner>
      {true && (
        <>
          Here&apos;s what to do next:
          <ul className={`${baseClass}__instructions`}>
            <li>
              <SeedButton />
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default BeforeDashboard;
