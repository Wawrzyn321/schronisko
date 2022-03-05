<script lang="ts">
  import Modal from '../shared/Modal.svelte';
  import type { NewsListElement } from '../../services/NewsService';
  import { newsService } from '../../services/NewsService';
  import { notifyError } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let onNewsDeleted: (news: NewsListElement) => any;
  export let news: NewsListElement;

  let loading = false;

  async function deleteNews() {
    try {
      loading = true;
      await newsService.delete(news.id);
      onNewsDeleted(news);
    } catch (e) {
      notifyError({ message: 'Nie można usunąć newsa: ' + e.message });
    }
    loading = false;
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Usuń newsa"
  confirmText="Usuń"
  onConfirm={deleteNews}
  disabledConfirm={loading}
  loadingConfirm={loading}
>
  {#if !!news}
    <p>
      Czy na pewno chcesz usunąć news <strong> {news.title}</strong>? Pamiętaj,
      że zawsze możesz określić go jako niepubliczny.
    </p>
  {/if}
</Modal>
