export const MAX_REQUEST_SIZE = '50mb';
export const PORT = 60045;
export const IS_DEV = process.env.NODE_ENV !== 'production'
export const WEB_STATIC_FILES_PATH = getStaticFilesPath(IS_DEV);

function getStaticFilesPath(isDev: boolean) {
    if (isDev) {
        return `http://localhost:${PORT}`;
    }

    const { NEXT_PUBLIC_SERVER_DOMAIN } = process.env;
    if (!NEXT_PUBLIC_SERVER_DOMAIN) {
        throw Error('NEXT_PUBLIC_SERVER_DOMAIN is required');
    }
    return NEXT_PUBLIC_SERVER_DOMAIN;
}
