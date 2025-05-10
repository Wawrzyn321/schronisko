export type VolunteeringFormFetch = {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  about: string;
  captchaToken: string;
};

export function validateVoluneeringFormFetch(props: VolunteeringFormFetch) {
  return Boolean(
    props.fullName &&
      props.email &&
      props.phoneNumber &&
      props.birthDate &&
      props.about &&
      props.captchaToken,
  );
}

export type VAdoptionFormFetch = {
  fullName: string;
  vCaretakerName: string;
  email: string;
  additionalMessage: string;
  animalId: string;
  animalName: string;
  animalRefNo: string;
  captchaToken: string;
};

export function validateVAdoptionFormFetch(props: VAdoptionFormFetch) {
  return Boolean(
    props.fullName &&
      props.vCaretakerName &&
      props.email &&
      props.animalId &&
      props.animalName &&
      props.animalRefNo &&
      props.captchaToken,
  );
}
