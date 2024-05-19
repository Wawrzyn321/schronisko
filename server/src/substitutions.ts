import type { Settings } from '@prisma-app/client';

const subsitutions = {
  '%KONTO%': 'V_ADOPTION_ACCOUNT_NUMBER',
  '%KRS%': 'KRS_NUMBER',
};

export function substitute(source: string, settings: Settings[]) {
  if (!settings) {
    return source;
  }

  settings.forEach((setting) => {
    const subsitutionForSetting = Object.entries(subsitutions).find(
      ([, v]) => v === setting.id,
    );
    if (!subsitutionForSetting) return;

    const [toSubsitute] = subsitutionForSetting;
    source = source.replace(new RegExp(toSubsitute, 'g'), setting.value || '');
  });

  return source;
}

export function containsSubsitution(source: string) {
  return Object.keys(subsitutions).some((subsitutionKey) =>
    source.includes(subsitutionKey),
  );
}
