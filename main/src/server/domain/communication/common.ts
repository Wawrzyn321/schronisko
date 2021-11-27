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

}

export function validateVAdoptionFormFetch(props: VAdoptionFormFetch) {
    return 2;
}
