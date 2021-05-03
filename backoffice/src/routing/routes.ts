import Login from '../views/Login.svelte';
import Users from '../views/Users.svelte';
import Pages from '../views/Pages.svelte';
import Page from '../views/Page.svelte';
import News from '../views/News.svelte';
import SingleNews from '../views/SingleNews.svelte';
import Animals from '../views/Animals.svelte';
import Profile from '../views/Profile.svelte';

import { unauthorizedWrapper, rootWrapper } from './helpers';

export const routes = {
    '/': rootWrapper(Profile),
    '/login': Login,
    '/users': unauthorizedWrapper(Users),
    '/pages': (Pages),
    '/pages/:id': unauthorizedWrapper(Page),
    '/news': unauthorizedWrapper(News),
    '/news/:id': unauthorizedWrapper(SingleNews),
    '/animals': unauthorizedWrapper(Animals),
    '/profile': unauthorizedWrapper(Profile),
};