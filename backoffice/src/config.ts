const isLocal = () => ['localhost', '127.0.0.1'].includes(location.hostname);

const {VITE_SERVER_URL, VITE_CLIENT_URL} = import.meta.env

export const MAIN_PAGE_URL = isLocal() ? 'http://localhost:3015' : VITE_CLIENT_URL;
export const API_URL = isLocal() ? 'http://localhost:60045' : VITE_SERVER_URL;
export const STATIC_URL = API_URL + '/img';

export const PAGE_MAP = {
    'jak-adoptowac-wirtualnie': '/v-adoptions/how-to',
    'glowna-adopcje': '/',
    'jak-pomoc': '/how-to',
    'wolontariat-kot': '/volunteering/cats',
    'kontakt': '/contact',
    'koty-do-adopcji': '/animals/to-adopt/cats',
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