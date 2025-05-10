import { VAdoptionFormFetch, VolunteeringFormFetch } from "types";
import { BACKEND_URL } from "./config";
import { doPost } from "./api";

export async function submitVolunteeringForm(
    props: VolunteeringFormFetch,
): Promise<void> {
    const url = BACKEND_URL + "/api/comms/volunteer";
    return doPost(url, props);
}

export async function submitVAdoptionForm(
    props: VAdoptionFormFetch,
): Promise<void> {
    const url = BACKEND_URL + "/api/comms/v-adoption?";
    return doPost(url, props);
}
