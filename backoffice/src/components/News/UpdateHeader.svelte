<script lang="ts">
  import type { News } from '.prisma/client';

  import { Button, Toast } from 'svelma';
  import { push } from 'svelte-spa-router';
  import DateFromTimestamp from '../DateFromTimestamp.svelte';
  import DeleteNewsModal from './DeleteNewsModal.svelte';

  export let isPublished: boolean;
  export let timestamp: any;
  export let isValid: boolean;
  export let news: News;
  export let updateNews: () => any;

  let deleteModalVisible = false;

  function onNewsDeleted() {
    Toast.create({
      message: `Usunięto post ${news.title}`,
      type: 'is-success',
      position: 'is-bottom',
    });
    push('/news');
  }
</script>

<header>
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
      on:click={() => deleteModalVisible = true}
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
  header {
    & > div {
      display: flex;
      align-items: center;
    }

    label {
      margin-right: 16px;
    }
  }
</style>
