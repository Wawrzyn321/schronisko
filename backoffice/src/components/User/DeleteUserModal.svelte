<script lang="ts">
  import Modal from './../Modal.svelte';
  import type { UserViewModel } from '../../common/UserViewModel';
  import { userService } from '../../services/UserService';
  import { notifyError } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let onUserDeleted: (user: UserViewModel) => any;
  export let user: UserViewModel;

  let loading = false;

  async function deleteUser() {
    try {
      loading = true;
      await userService.deleteUser(user.id);
      onUserDeleted(user);
    } catch (e) {
      notifyError({
        message: 'Nie udało się usunąć użytkownika: ' + e.message,
      });
    }
    loading = false;
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Usuń użytkownika"
  confirmText="Usuń"
  onConfirm={deleteUser}
  disabledConfirm={loading}
  loadingConfirm={loading}
>
  {#if !!user}
    <p>
      Czy na pewno chceesz usunąć użytkownika
      <strong>
        {user.firstName}
        {' '}
        {user.lastName}
      </strong>?
    </p>
  {/if}
</Modal>
