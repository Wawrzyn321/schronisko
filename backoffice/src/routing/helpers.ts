
import { wrap } from 'svelte-spa-router/wrap';
import { push } from 'svelte-spa-router';
import { auth } from '../auth.context';
import { get } from 'svelte/store';


export const unauthorizedWrapper = (component) =>
    wrap({
        component,
        conditions: [
            () => {
                if (!get(auth)) {
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
