import { setupSentry } from './setupSentry';
import App from './views/App.svelte';
import 'bulma/css/bulma.css';

if (process.env.NODE_ENV === 'production') {
  setupSentry();
}

const app = new App({
  target: document.getElementById('app')!,
})

export default app
