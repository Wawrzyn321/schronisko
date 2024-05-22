<script lang="ts">
  import type { News } from '@prisma-app/client';

  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { notifySuccess } from '../../contexts/notification.context';
  import DeleteNewsModal from './DeleteNewsModal.svelte';
  import NewsExternalLink from './NewsExternalLink.svelte';
  import AboutSubstitutions from '../shared/AboutSubstitutions.svelte';

  export let isPublished: boolean;
  export let isValid: boolean;
  export let news: News;
  export let updateNews: () => void;
  export let isSaving: boolean;

  let deleteModalVisible = false;

  function onNewsDeleted() {
    notifySuccess({ message: 'News został usunięty.' });
    push('/news');
  }
</script>

<header class="g-flex-between-100">
  <h1>
    <a href="/#/news">Newsy</a>
    <span class="g-breadcrumb-separator">/ </span>{news.title}
  </h1>
  <AboutSubstitutions />
  <div class="update-header__actions">
    <label>
      <input
        checked={isPublished}
        type="checkbox"
        on:change={() => (isPublished = !isPublished)}
      />
      Publiczny
    </label>
    <Button
      type="is-primary"
      on:click={updateNews}
      disabled={!isValid || isSaving}
    >
      Zapisz
    </Button>
    <NewsExternalLink {news} />
    <Button
      type="is-danger"
      on:click={() => (deleteModalVisible = true)}
      aria-label="Usuń newsa"
    >
      Usuń
    </Button>
  </div>
</header>
<DeleteNewsModal
  bind:modalVisible={deleteModalVisible}
  {onNewsDeleted}
  {news}
/>

<style lang="scss">
  header {
    margin-bottom: 16px;
  }

  label {
    margin-right: 16px;
  }

  .update-header__actions {
    display: flex;
    column-gap: 4px;
  }
</style>
