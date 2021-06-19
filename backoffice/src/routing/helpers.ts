
import { wrap } from 'svelte-spa-router/wrap';
import { push } from 'svelte-spa-router';
import { isLoggedIn } from '../contexts/auth.context';

export const unauthorizedWrapper = (component: any) =>
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

export const rootWrapper = (component: any) =>
    wrap({
        component, // ignored anyway
        conditions: [
            () => {
                push(isLoggedIn() ? '/profile' : '/login');
                return false;
            }
        ]
    });
