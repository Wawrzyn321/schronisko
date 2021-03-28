import type { PriviledgeType } from "../../../prisma/viewModels/UserViewModel";

export const priviledges: PriviledgeType[] = ['USER', 'CONST_POST', 'POST', 'ANIMAL'];

export const priviledgeNames = {
    USER: 'Użytkownicy',
    CONST_POST: 'Stałe posty',
    POST: 'Posty',
    ANIMAL: 'Zwierzęta',
};

export const priviledgeDescriptions = {
    USER: 'Zarządzanie użytkownikami - dodawanie, usuwanie, zmiana uprawnień.',
    CONST_POST: 'Zarządzanie postami zawsze obecnymi na stronie, takimi jak "Kontakt", "O nas".',
    POST: 'Zarządzanie postami na sliderze.',
    ANIMAL: 'Zarządzanie zwierzętami - dodawanie, usuwanie, przenoszenie między kategoriami.',
};
