import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";



  return (
    <>
    <Image
      alt="Elanto logo"
      width={200}
      height={40}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx("max-w-[40rem] w-full h-[70px] hidden md:block", className)}
      src="/elanto/logo.svg"
    />
    <Image
      alt="Elanto logo"
      width={200}
      height={80}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx("w-[40rem] aspect-auto md:hidden block", className)}
      src="/elanto/logo-mobile.svg"
    />
    </>
  )}
