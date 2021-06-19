<script lang="ts">
  import Modal from './../Modal.svelte';
  import type { UserViewModel } from '../../prisma-types/viewModels/UserViewModel';
  import { authService } from '../../services/AuthService';
  import PasswordInput from './../PasswordInput.svelte';
  import {
    notifyError,
    notifySuccess,
  } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let user: UserViewModel;

  let password = '';

  async function updateUserPassword() {
    try {
      await authService.changeUserPassword(user, password);
      notifySuccess({
        message: `Zmieniono hasło użytkownika ${user.firstName} ${user.lastName}.`,
      });
    } catch (e) {
      notifyError({ message: 'Błąd zmiany hasła: ' + e.message });
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Zmień hasło użytkownika"
  confirmText="Zatwierdź"
  onConfirm={updateUserPassword}
>
  <form>
    <PasswordInput
      bind:password
      plain
      message="Przekaż hasło użytkownikowi po jego zmianie!"
    />
  </form>
</Modal>
