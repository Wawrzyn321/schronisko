import App from './views/App.svelte';
import 'bulma/css/bulma.css';

const app = new App({
	target: document.body,
    hydrate: true,
});

export default app;