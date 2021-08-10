<script lang="ts">
  import Modal from '../shared/Modal.svelte';
  import type { UserViewModel } from '../../common/UserViewModel';
  import { authService } from '../../services/AuthService';
  import PasswordInput from './PasswordInput.svelte';
  import {
    notifyError,
    notifySuccess,
  } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let user: UserViewModel;

  let password = '';
  let loading = false;

  async function updateUserPassword() {
    try {
      loading = true;
      await authService.changeUserPassword(user, password);
      notifySuccess({
        message: `Zmieniono hasło użytkownika ${user.firstName} ${user.lastName}.`,
      });
    } catch (e) {
      notifyError({ message: 'Błąd zmiany hasła: ' + e.message });
    }
    loading = false;
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title={`Zmień hasło użytkownika ${user?.login}`}
  confirmText="Zatwierdź"
  onConfirm={updateUserPassword}
  disabledConfirm={loading}
  loadingConfirm={loading}
>
  <form>
    <PasswordInput
      bind:password
      plain
      message="Przekaż hasło użytkownikowi po jego zmianie!"
    />
  </form>
</Modal>
