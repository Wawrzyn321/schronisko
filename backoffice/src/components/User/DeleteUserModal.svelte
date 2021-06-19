<script lang="ts">
  import Modal from './../Modal.svelte';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import { userService } from '../../services/UserService';
  import { notifyError } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let onUserDeleted: (user: UserViewModel) => any;
  export let user: UserViewModel;

  async function deleteUser() {
    try {
      await userService.deleteUser(user.id);
      onUserDeleted(user);
    } catch (e) {
      notifyError({
        message: 'Nie udało się usunąć użytkownika: ' + e.message,
      });
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Usuń użytkownika"
  confirmText="Usuń"
  onConfirm={deleteUser}
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
