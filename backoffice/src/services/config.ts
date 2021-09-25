const getApiUrl = () => {
    if (location.hostname === 'localhost') {
        return 'http://localhost:60045'
    } else {
        return 'https://oto-jest-wawrzyn.pl:60045';
    }
}

export const API_URL = getApiUrl();;
export const STATIC_URL = API_URL + '/img';
