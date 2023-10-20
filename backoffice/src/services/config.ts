const getApiUrl = () => {
    if (location.hostname === 'localhost') {
        return 'http://localhost:60045'
    } else {
        return 'http://schronisko-backend2.oto-jest-wawrzyn.pl';
    }
}

export const API_URL = getApiUrl();
export const STATIC_URL = API_URL + '/img';
