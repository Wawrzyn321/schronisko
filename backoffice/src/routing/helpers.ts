import { wrap } from 'svelte-spa-router/wrap';
import { push } from 'svelte-spa-router';
import { isLoggedIn } from '../contexts/auth.context';
import type { SvelteComponent } from 'svelte';

export const unauthorizedWrapper = (component: typeof SvelteComponent<any>) =>
    wrap({
        component,
        conditions: [
            () => {
                if (!isLoggedIn()) {
                    push('/login');
                    return false;
                }
                return true;
            },
        ],
    });

export const loginWrapper = (component: typeof SvelteComponent<any>) =>
    wrap({
        component,
        conditions: [
            () => {
                if (isLoggedIn()) {
                    push('/profile');
                    return false;
                }
                return true;
            },
        ],
    });


export const rootWrapper = (component: typeof SvelteComponent<any>) =>
    wrap({
        component, // ignored anyway
        conditions: [
            () => {
                push(isLoggedIn() ? '/profile' : '/login');
                return false;
            }
        ]
    });
