import App from './views/App.svelte';
import 'bulma/css/bulma.css';

import * as Sentry from "@sentry/svelte";

Sentry.init({
  dsn: "https://29caabec70f98bfa7a704c255f24a7fc@o4506949522685952.ingest.us.sentry.io/4506949526028288",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const app = new App({
	target: document.body,
    hydrate: true,
});

export default app;