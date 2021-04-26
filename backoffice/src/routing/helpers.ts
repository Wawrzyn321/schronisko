
import { wrap } from 'svelte-spa-router/wrap';
import { push } from 'svelte-spa-router';
import { isLoggedIn } from '../auth.context';

export const unauthorizedWrapper = (component) =>
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

// export const rootWrapper = wrap({
//     component: Profile,
//     conditions: [
//         () => {
//             if (!user) {
//                 push('/login');
//                 return 
//             }

//             return false;
//         }
//     ]
// });
