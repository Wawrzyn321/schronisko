export type VolunteeringFormFetch = {
    fullName: string;
    email: string;
    telNumber: string;
    birthDate: string;
    about: string;
}

export function validateVoluneeringFormFetch(props: VolunteeringFormFetch) {
    return Boolean(props.fullName && props.email && props.telNumber && props.birthDate && props.about);
}

export type VAdoptionFormFetch = {
    fullName: string;
    vCaretakerName: string;
    email: string;
    additionalMessage: string;
    animalId: string;
    animalName: string;
    animalRefNo: string;
}

export function validateVAdoptionFormFetch(props: VAdoptionFormFetch) {
    return Boolean(props.fullName && props.vCaretakerName && props.email && props.animalId && props.animalName && props.animalRefNo);
}
