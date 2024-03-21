<script lang="ts">
  import Modal from '../shared/Modal.svelte';
  import { logsService } from '../../services/LogsService';
  import { notifyError } from '../../contexts/notification.context';

  let loading = false;

  export let onLogsDeleted: () => void;
  export let modalVisible: boolean;

  async function deleteLogs() {
    try {
      await logsService.delete();
      onLogsDeleted();
    } catch (e) {
      notifyError({ message: 'Nie udało się usunąć logów: ' + e.message });
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Usuń logi"
  confirmText="Usuń"
  onConfirm={deleteLogs}
  disabledConfirm={loading}
  loadingConfirm={loading}
>
  <p>Czy na pewno chcesz usunąć logi?</p>
</Modal>
