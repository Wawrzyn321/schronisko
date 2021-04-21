<script lang="ts">
  import Modal from './../Modal.svelte';
  import { Modal as SModal } from 'svelma';
  // import { auth } from '../../auth.context';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import { throwingFetch } from '../../common/throwingFetch';

  export let modalVisible: boolean;
  export let onUserDeleted: (user: UserViewModel) => any;
  export let selectedUser: UserViewModel;

  async function deleteUser() {
    const user = await throwingFetch(`http://localhost:3000/api/users/${selectedUser.id}`, {
      method: 'DELETE',
    });
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
    <p>Czy na pewno chceesz usunąć użytkownika <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>?</p>
    </Modal>
  </SModal>
</div>
