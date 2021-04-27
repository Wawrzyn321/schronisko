import Login from '../views/Login.svelte';
import Users from '../views/Users.svelte';
import ConstPosts from '../views/ConstPosts.svelte';
import ConstPostPreview from '../views/ConstPost.svelte';
import Posts from '../views/Posts.svelte';
import Animals from '../views/Animals.svelte';
import Profile from '../views/Profile.svelte';

import { unauthorizedWrapper } from './helpers';

export const routes = {
    '/': unauthorizedWrapper(Profile),
    '/login': Login,
    '/users': unauthorizedWrapper(Users),
    '/const-posts': unauthorizedWrapper(ConstPosts),
    '/const-posts/:id': unauthorizedWrapper(ConstPostPreview),
    '/posts': unauthorizedWrapper(Posts),
    '/animals': unauthorizedWrapper(Animals),
    '/profile': unauthorizedWrapper(Profile),
};