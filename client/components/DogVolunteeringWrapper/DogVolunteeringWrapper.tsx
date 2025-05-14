import { useQuery } from "@tanstack/react-query";
import { settingsQueryOptions } from "api/queryOptions";
import { Article } from "components/Article/Article";
import { VolunteeringForm } from "components/VolunteeringForm/VolunteeringForm";
import { ERROR_VOLUNTEERING_FORM } from "errors";
import React from "react";

export function DogVolunteeringWrapper() {
  const { data: settings, error } = useQuery(settingsQueryOptions());

  if (error) {
    return <Article {...ERROR_VOLUNTEERING_FORM} />;
  }

  const areDogVolunteeringEnabled =
    settings?.find((s) => s.id === "DOG_VOLUNTEERING_ENABLED")?.value ===
    "true";

  return areDogVolunteeringEnabled ? <VolunteeringForm /> : null;
}
