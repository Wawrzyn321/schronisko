import Login from '../views/Login.svelte';

import Users from '../views/Users.svelte';
import Logs from '../views/Logs.svelte';

import Profile from '../views/Profile.svelte';

import Pages from '../views/Pages.svelte';
import Page from '../views/Page.svelte';

import News from '../views/News.svelte';
import SingleNews from '../views/SingleNews.svelte';
import CreateNews from '../views/CreateNews.svelte';

import Animals from '../views/Animals.svelte';
import Animal from '../views/Animal.svelte';
import CreateAnimal from '../views/CreateAnimal.svelte';

import Settings from '../views/Settings.svelte';

import { unauthorizedWrapper, loginWrapper, rootWrapper } from './helpers';

export const routes = {
    '/': rootWrapper(Profile),
    '/login': loginWrapper(Login),
    '/users': unauthorizedWrapper(Users),
    '/logs': unauthorizedWrapper(Logs),
    '/pages': unauthorizedWrapper(Pages),
    '/pages/:id': unauthorizedWrapper(Page),
    '/news': unauthorizedWrapper(News),
    '/news/:id': unauthorizedWrapper(SingleNews),
    '/news-add': unauthorizedWrapper(CreateNews),
    '/animals': unauthorizedWrapper(Animals),
    '/animals/:id': unauthorizedWrapper(Animal),
    '/animals-add': unauthorizedWrapper(CreateAnimal),
    '/profile': unauthorizedWrapper(Profile),
    '/settings': unauthorizedWrapper(Settings),
};
