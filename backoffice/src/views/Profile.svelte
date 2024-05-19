<script lang="ts">
  import { auth } from '../contexts/auth.context';
  import ChangePasswordModal from '../components/User/ChangePasswordModal.svelte';
  import PermissionDescription from '../components/User/PermissionDescription.svelte';

  let passwordModalVisible = false;
</script>

{#if $auth}
  <main>
    <p style="margin-bottom: 32px">
      Jesteś zalogowany jako
      <strong>
        {$auth?.user.firstName}
        {''}
        {$auth?.user.lastName}
      </strong>
      ({$auth?.user.login}).
      <button class="link" on:click={() => (passwordModalVisible = true)}>
        Zmień hasło
      </button>
    </p>
    {#if $auth?.user.permissions.length}
      <section>
        <p>Twoje uprawnienia:</p>
        <ul>
          {#each $auth.user.permissions as permission}
            <li><PermissionDescription permissionType={permission} /></li>
          {/each}
        </ul>
        <p style="margin-top: 32px">
          Jeśli potrzebujesz innych uprawień, skontaktuj się z administratorem
          schroniska.
        </p>
      </section>
    {/if}
  </main>
  <ChangePasswordModal bind:modalVisible={passwordModalVisible} />
{/if}

<style lang="scss">
  main {
    margin: 32px;
  }
</style>
