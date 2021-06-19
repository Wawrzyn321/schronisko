<script lang="ts">
  import Modal from './../Modal.svelte';
  import type { NewsListElement } from '../../services/NewsService';
  import { newsService } from '../../services/NewsService';
  import { notifyError } from '../../contexts/notification.context';

  export let modalVisible: boolean;
  export let onNewsDeleted: (news: NewsListElement) => any;
  export let news: NewsListElement;

  async function deleteNews() {
    try {
      await newsService.delete(news.id);
      onNewsDeleted(news);
    } catch (e) {
      notifyError({ message: 'Nie można usunąć posta: ' + e.message });
    }
  }
</script>

<Modal
  bind:isOpen={modalVisible}
  title="Usuń newsa"
  confirmText="Usuń"
  onConfirm={deleteNews}
>
  {#if !!news}
    <p>
      Czy na pewno chceesz usunąć news <strong> {news.title}</strong>? Pamiętaj,
      że zawsze możesz określić go jako niepubliczny.
    </p>
  {/if}
</Modal>
