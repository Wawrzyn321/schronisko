<script lang="ts">
  import type { News } from '.prisma/client';

  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { notifySuccess } from '../../contexts/notification.context';
  import DateFromTimestamp from '../DateFromTimestamp.svelte';
  import DeleteNewsModal from './DeleteNewsModal.svelte';

  export let isPublished: boolean;
  export let timestamp: Date;
  export let isValid: boolean;
  export let news: News;
  export let updateNews: () => any;

  let deleteModalVisible = false;

  function onNewsDeleted() {
    notifySuccess({ message: 'News został usunięty.' });
    push('/news');
  }
</script>

<header class="g-flex-between-100">
  <h1>Edycja newsa</h1>
  <span>
    Utworzony:
    <DateFromTimestamp {timestamp} />
  </span>
  <div>
    <label>
      <input
        checked={isPublished}
        type="checkbox"
        on:change={() => (isPublished = !isPublished)}
      />
      Publiczny
    </label>
    <Button type="is-primary" on:click={updateNews} disabled={!isValid}>
      Zapisz
    </Button>
    <Button
      type="is-danger"
      on:click={() => (deleteModalVisible = true)}
      style="margin-left: 8px"
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
  header > div {
    display: flex;
    justify-content: center;
  }

  label {
    margin-right: 16px;
  }
</style>
