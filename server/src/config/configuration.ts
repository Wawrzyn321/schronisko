export const ENV_DISABLED = 'DISABLED';

export const LOCAL_STATIC_FILES_PATH = '../images/';

export enum CONFIG {
    'redisUrl' = 'redisUrl',
    'postmarkApiToken' = 'postmarkApiToken',
    'captchaKey' = 'captchaKey',
    'webStaticFilesPath' = 'webStaticFilesPath',
    'localStaticFilesPath' = 'localStaticFilesPath'
}

export default () => ({
    [CONFIG.redisUrl]: required('REDIS_URL'),
    [CONFIG.postmarkApiToken]: required('POSTMARK_API_TOKEN'),
    [CONFIG.captchaKey]: required('RECAPTCHA_SECRET_KEY'),
    [CONFIG.webStaticFilesPath]: '',
    [CONFIG.localStaticFilesPath]: LOCAL_STATIC_FILES_PATH,
});

function required(key: string) {
    const value = process.env[key]
    if (!value) {
        throw Error(`${key} is required.`)
    }
    return value;
}