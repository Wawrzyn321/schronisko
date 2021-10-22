import { AnimalCategory, AnimalGender } from '.prisma/client';

const niedawnoZnalezioneTemplate = `W schronisku od (). Znajda z ().

Kontakt: 32 293 75 56 (7.00-14.00 w tyg. roboczym) lub 669 096 872 (14.00-24.00 oraz w weekendy i święta)
`

export const descriptionTemplates = {
    [AnimalCategory.NiedawnoZnalezione]: {
        [AnimalGender.FEMALE]: niedawnoZnalezioneTemplate,
        [AnimalGender.MALE]: niedawnoZnalezioneTemplate,
    },
    [AnimalCategory.DoAdopcji]: {
        [AnimalGender.FEMALE]: `() została odrobaczona, odpchlona, zaszczepiona, zachipowana i wykastrowana.

Obowiązuje wizyta przed i poadopcyjna, spacer zapoznawczy, uiszczenie opłaty schroniskowej i podpisanie umowy adopcyjnej.
`,
        [AnimalGender.MALE]: `() został odrobaczony, odpchlony, zaszczepiony, zachipowany i wykastrowany.

Obowiązuje wizyta przed i poadopcyjna, spacer zapoznawczy, uiszczenie opłaty schroniskowej i podpisanie umowy adopcyjnej.
`
    },
};