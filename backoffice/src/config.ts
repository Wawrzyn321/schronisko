const isLocal = () => ['localhost', '127.0.0.1'].includes(location.hostname);

export const MAIN_PAGE_URL = isLocal() ? 'http://localhost:3015' : 'http://schronisko-main2.oto-jest-wawrzyn.pl';
export const API_URL = isLocal() ? 'http://localhost:60045' : 'http://schronisko-backend2.oto-jest-wawrzyn.pl';
export const STATIC_URL = API_URL + '/img';

export const PAGE_MAP = {
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