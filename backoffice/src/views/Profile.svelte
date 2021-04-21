<script lang="ts">
  import { auth } from '../auth.context';
  import PriviledgeDescription from '../components/PriviledgeDescription.svelte';
</script>

<main>
  <p style="margin-bottom: 32px">
    Jesteś zalogowany jako <strong>
      {$auth.user.firstName}
      {''}
      {$auth.user.lastName}</strong
    >.
  </p>
  <section>
    <p>Twoje uprawnienia:</p>
    <ul>
      {#each $auth.user.priviledges as priviledge}
        <li><PriviledgeDescription priviledgeType={priviledge} /></li>
      {/each}
    </ul>
    <p style="margin-top: 32px">
      Jeśli potrzebujesz innych uprawień, skontaktuj się z administratorem.
    </p>
  </section>
</main>

<style>
  main {
    margin: 32px;
  }
</style>
