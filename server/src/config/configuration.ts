export const MAX_REQUEST_SIZE = '50mb';
export const PORT = 60045;
export const ENV_DISABLED = 'DISABLED';
export const LOCAL_STATIC_FILES_PATH = '../images/';
export const IS_DEV = process.env.NODE_ENV !== 'production';

export enum CONFIG {
  'redisUrl' = 'redisUrl',
  'postmarkApiToken' = 'postmarkApiToken',
  'captchaKey' = 'captchaKey',
  'webStaticFilesPath' = 'webStaticFilesPath',
  'localStaticFilesPath' = 'localStaticFilesPath',
}

export default () => ({
  [CONFIG.redisUrl]: required('REDIS_URL'),
  [CONFIG.postmarkApiToken]: required('POSTMARK_API_TOKEN'),
  [CONFIG.captchaKey]: required('RECAPTCHA_SECRET_KEY'),
  [CONFIG.webStaticFilesPath]: getStaticFilesPath(),
  [CONFIG.localStaticFilesPath]: LOCAL_STATIC_FILES_PATH,
});

function required(key: string) {
  const value = process.env[key];
  if (!value) {
    throw Error(`${key} is required.`);
  }
  return value;
}

function getStaticFilesPath() {
  if (IS_DEV) {
    return `http://localhost:${PORT}`;
  }

  const { NEXT_PUBLIC_SERVER_DOMAIN } = process.env;
  if (!NEXT_PUBLIC_SERVER_DOMAIN) {
    throw Error('NEXT_PUBLIC_SERVER_DOMAIN is required');
  }
  return NEXT_PUBLIC_SERVER_DOMAIN;
}
