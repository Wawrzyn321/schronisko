<script lang="ts">
  import { ExternalLinkIcon } from 'svelte-feather-icons';
  import { auth } from '../contexts/auth.context';
  import { link } from 'svelte-spa-router';
  import UserNavHeader from './UserNavHeader.svelte';
  import active from 'svelte-spa-router/active';
  import { Permission } from '@prisma/client';

  interface NavigationRoute {
    name: string;
    requiredPermission: Permission;
    path: string;
  }

  const navigationRoutes: NavigationRoute[] = [
    {
      name: 'Użytkownicy',
      requiredPermission: Permission.USER,
      path: '/users',
    },
    {
      name: 'Strony',
      requiredPermission: Permission.PAGE,
      path: '/pages',
    },
    {
      name: 'Newsy',
      requiredPermission: Permission.NEWS,
      path: '/news',
    },
    {
      name: 'Zwierzęta',
      requiredPermission: Permission.ANIMAL,
      path: '/animals',
    },
  ];
</script>

<nav>
  <a href="https://www.schronisko.sosnowiec.pl/" target="_blank">
    Strona schroniska
    <ExternalLinkIcon size="0.9x" />
  </a>
  {#if $auth}
    <ul>
      {#each navigationRoutes as route}
        {#if $auth.user.permissions.includes(route.requiredPermission)}
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
