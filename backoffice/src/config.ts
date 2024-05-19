export const MAIN_PAGE_URL = location.hostname === 'localhost' ? 'http://localhost:3015' : 'http://schronisko-main2.oto-jest-wawrzyn.pl';

const getApiUrl = () => {
    if (location.hostname === 'localhost') {
        return 'http://localhost:60045'
    } else {
        return 'http://schronisko-backend2.oto-jest-wawrzyn.pl';
    }
}

export const API_URL = getApiUrl();
export const STATIC_URL = API_URL + '/img';

export const PAGE_MAP: Record<string, string> = {
    'jak-adoptowac-wirtualnie': '/v-adoptions/how-to',
    // 'info-po-adopcji-wirtualnej': 
    'glowna-adopcje': '/',
    'jak-pomoc': '/how-to',
    'wolontariat-kot': '/volunteering/cats',
    'kontakt': '/contact',
    'koty-do-adopcji': '/animals/to-adopt/cats',
    // 'modal-adopcji-wirtualnej',
    // 'faq': 
    'o-nas': '/about',
    'odeszly': '/animals/gone',
    'odeszly-wiersz': '/animals/gone',
    'dotacje': '/pages/dotacje',
    'psy-do-adopcji': '/animals/to-adopt/dogs',
    'szukaja-opiekunow': '/v-adoptions/to-adopt',
    'wolontariat-pies-off': '/volunteering/dogs',
    'wolontariat-pies-on': '/volunteering/dogs',
    'znalazly-opiekunow': '/animals/adopted',
    'zwierzeta-znalezione': '/animals/recently-found',
}