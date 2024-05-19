import type { Settings } from '@prisma-app/client';

const subsitutions = {
    '%KONTO%': 'V_ADOPTION_ACCOUNT_NUMBER',
    '%KRS%': 'KRS_NUMBER',
};

export const substitutionDescriptions = {
    '%KONTO%': 'Numer konta do dotacji',
    '%KRS%': 'Numer KRS',
};

export function substitute(source: string, settings: Settings[]) {
    if (!settings) {
        return source;
    }

    settings.forEach(setting => {
        const entry = Object.entries(subsitutions).find(([k, v]) => v === setting.id);
        if (entry) {
            const [toSubsitute, settingsKey] = entry;
            const subsitution = settings.find(s => s.id === settingsKey)?.value;
            source = source.replace(new RegExp(toSubsitute, 'g'), subsitution || '');
        }
    })

    return source;
}

export function containsSubsitution(source: string) {
    return Object.keys(subsitutions).some((subsitutionKey) =>
        source.includes(subsitutionKey)
    );
}
