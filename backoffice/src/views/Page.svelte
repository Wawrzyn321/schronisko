<script lang="ts">
  import { onMount } from 'svelte';
  import { querystring } from 'svelte-spa-router';
  import { get } from 'svelte/store';
  import { Button, Toast } from 'svelma';
  import { pageService } from '../services/PageService';
  import EditorTabs from '../components/EditorTabs.svelte';
  import type { Page } from '../Page';

  export let params: { id: string };
  const id = params.id;
  let modeIndex =
    new URLSearchParams(get(querystring)).get('mode') === 'edit' ? 0 : 1;

  let page: Page;
  let editedContent = '';
  let isSaving: boolean;

  onMount(async () => {
    page = await pageService.get(id);
    editedContent = page.content;
  });

  async function savePost() {
    await pageService.save({ ...page, content: editedContent });
    Toast.create({
      message: 'Post zapisany',
      type: 'is-success',
      position: 'is-bottom',
    });
    page.content = editedContent;
  }
</script>

{#if page}
  <header>
    <h1>{page.title}</h1>
    <Button
      type="is-primary"
      disabled={isSaving || page.content === editedContent}
      loading={isSaving}
      on:click={savePost}>Zapisz</Button
    >
  </header>
  <EditorTabs bind:editedContent={editedContent} initialContent={page.content} />
{:else}
  Ładowanie...
{/if}

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
  }
</style>
