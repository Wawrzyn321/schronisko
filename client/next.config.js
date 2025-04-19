// non-transpiled file, cannot use TS

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const cspHeader = `
    default-src 'self' http://localhost:60045 ${NEXT_PUBLIC_SERVER_URL} https://www.google.com/;
    script-src 'self' 'unsafe-eval' https://www.google.com/recaptcha/enterprise.js https://www.gstatic.com/recaptcha/releases/;
    style-src 'self' 'unsafe-inline';
    img-src 'self' http://localhost:60045 ${NEXT_PUBLIC_SERVER_URL} blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
`;

const baseConfig = {
  async redirects() {
    return [
      {
        source: '/animals',
        destination: '/',
        permanent: true,
      },
      {
        source: '/animals/details',
        destination: '/',
        permanent: true,
      },
      {
        source: '/animals/v-adopt',
        destination: '/',
        permanent: true,
      },
      {
        source: '/animals/to-adopt',
        destination: '/',
        permanent: true,
      },
      {
        source: '/volunteering',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
    }, {
      protocol: 'http',//todo change after SSL
      hostname: NEXT_PUBLIC_SERVER_URL.replace(/https?:\/\//, '')
    }]
  },
  i18n: {
    locales: ['pl'],
    defaultLocale: 'pl'
  }
};

const sentryWebpackPluginConfig = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "schronisko",
  project: "frontend-public",
};

const sentryOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

module.exports = withSentryConfig(
  baseConfig,
  sentryWebpackPluginConfig,
  sentryOptions
)
