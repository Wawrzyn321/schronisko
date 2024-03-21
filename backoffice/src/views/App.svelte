<script lang="ts">
  import Router from 'svelte-spa-router';
  import NotificationContext from '../contexts/NotificationContext.svelte';
  import Nav from '../routing/Nav.svelte';
  import { routes } from './../routing/routes';

  let ann: any = null;
</script>

<NotificationContext>
  <button type="button" on:click="{() => ann.tets}">Break the world</button>
  <Nav />
  <Router {routes} />
</NotificationContext>

<style lang="scss">
  :global(a.active) {
    font-weight: bolder;
  }
</style>
