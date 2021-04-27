<script lang="ts">
  import { auth } from '../auth.context';
  import ChangePasswordModal from '../components/ChangePasswordModal.svelte';
  import PriviledgeDescription from '../components/PriviledgeDescription.svelte';

  let passwordModalVisible = false;
</script>

<main>
  <p style="margin-bottom: 32px">
    Jesteś zalogowany jako <strong>
      {$auth.user.firstName}
      {''}
      {$auth.user.lastName}</strong
    >.
    <button class="link" on:click={() => (passwordModalVisible = true)}>
      Zmień hasło
    </button>
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
<ChangePasswordModal bind:modalVisible={passwordModalVisible} />

<style>
  main {
    margin: 32px;
  }
</style>
