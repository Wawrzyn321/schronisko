import React from "react";
import { useParams } from "next/navigation";

export function IdWrapper({ Component, ...props }) {
  const params = useParams();

  const id = params?.id as string | undefined;

  return <Component id={id} {...props} />;
}
