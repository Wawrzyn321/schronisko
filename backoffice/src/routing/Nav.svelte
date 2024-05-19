<script lang="ts">
  import { ExternalLinkIcon } from 'svelte-feather-icons';
  import { auth } from '../contexts/auth.context';
  import { link } from 'svelte-spa-router';
  import UserNavHeader from './UserNavHeader.svelte';
  import active from 'svelte-spa-router/active';
  import { Permission } from '@prisma-app/client';
  import { MAIN_PAGE_URL } from '../config';

  type NavigationRoute = {
    name: string;
    requiredPermissions: Permission[];
    path: string;
  };

  const navigationRoutes: NavigationRoute[] = [
    {
      name: 'Użytkownicy',
      requiredPermissions: [Permission.USER],
      path: '/users',
    },
    {
      name: 'Logi',
      requiredPermissions: [Permission.USER],
      path: '/logs',
    },
    {
      name: 'Strony',
      requiredPermissions: [Permission.PAGE],
      path: '/pages',
    },
    {
      name: 'Newsy',
      requiredPermissions: [Permission.NEWS],
      path: '/news',
    },
    {
      name: 'Zwierzęta',
      requiredPermissions: [Permission.ANIMAL, Permission.ANIMAL_VIEW_ONLY],
      path: '/animals',
    },
    {
      name: 'Dodatkowe ustawienia',
      requiredPermissions: [Permission.USER],
      path: '/settings',
    },
  ];
</script>

<nav>
  <a href={MAIN_PAGE_URL} target="_blank">
    Strona schroniska
    <ExternalLinkIcon size="0.9x" />
  </a>
  {#if $auth}
    <ul>
      {#each navigationRoutes as route}
        {#if $auth?.user.permissions.find( (p) => route.requiredPermissions.includes(p) )}
          <li>
            <a use:link use:active={`${route.path}.*`} href={`${route.path}`}>
              {route.name}
            </a>
          </li>
        {/if}
      {/each}
      <li><a use:link use:active href="/profile">Mój profil</a></li>
    </ul>
    <UserNavHeader />
  {/if}
</nav>

<style lang="scss">
  nav {
    vertical-align: middle;
    height: 60px;
    background-color: whitesmoke;
    display: flex;
    place-items: center;
    padding: 0 24px;
    white-space: nowrap;

    li {
      display: inline-block;
      margin-right: 10px;
    }

    a {
      display: inline-block;
      margin-right: 16px;
    }
  }
</style>
