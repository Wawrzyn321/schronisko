<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Modal as SModal } from 'svelma';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import { userService } from '../../services/UserService';

  export let modalVisible: boolean;
  export let onUserDeleted: (user: UserViewModel) => any;
  export let user: UserViewModel;

  async function deleteUser() {
    await userService.delete(user.id);
    onUserDeleted(user);
  }
</script>

<div>
  <SModal bind:active={modalVisible} onBody={false}>
    <Modal
      bind:isOpen={modalVisible}
      title="Usuń użytkownika"
      confirmText="Usuń"
      onConfirm={deleteUser}
    >
      <p>
        Czy na pewno chceesz usunąć użytkownika <strong
          >{user.firstName} {user.lastName}</strong
        >?
      </p>
    </Modal>
  </SModal>
</div>
