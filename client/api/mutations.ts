import { VAdoptionFormFetch, VolunteeringFormFetch } from "types";
import { BACKEND_URL } from "./config";
import { doPost } from "./api";
import { AnimalType } from "@prisma-app/client";

export async function submitVolunteeringForm(
  props: VolunteeringFormFetch,
  animalType: AnimalType,
): Promise<void> {
  const url = BACKEND_URL + "/api/comms/volunteer";
  return doPost(url, { ...props, animalType });
}

export async function submitVAdoptionForm(
  props: VAdoptionFormFetch,
): Promise<void> {
  const url = BACKEND_URL + "/api/comms/v-adoption?";
  return doPost(url, props);
}
