<script lang="ts">
  import { onMount } from 'svelte';
  import { querystring } from 'svelte-spa-router';
  import { get } from 'svelte/store';
  import { Button } from 'svelma';
  import { pageService } from '../services/PageService';
  import EditorTabs from '../components/shared/EditorTabs.svelte';
  import type { Page } from '.prisma/client';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import Loader from '../components/shared/Loader.svelte';

  export let params: { id: string };
  const id = params.id;
  let modeIndex =
    new URLSearchParams(get(querystring)).get('mode') === 'edit' ? 0 : 1;

  let page: Page;
  let editedContent = '';
  let isSaving: boolean;

  onMount(async () => {
    try {
      page = await pageService.get(id);
      editedContent = page.content;
    } catch (e) {
      notifyError({ message: 'Nie można pobrać strony: ' + e.message });
    }
  });

  async function savePost() {
    try {
      await pageService.save({ ...page, content: editedContent });
      notifySuccess({ message: 'Zmiany zostały zapisane' });
      page.content = editedContent;
    } catch (e) {
      notifyError({ message: 'Nie można zapisać strony: ' + e.message });
    }
  }
</script>

{#if page}
  <header>
    <h1>{page.title}</h1>
    <Button
      type="is-primary"
      disabled={isSaving || page.content === editedContent}
      loading={isSaving}
      on:click={savePost}
    >
      Zapisz
    </Button>
  </header>
  <EditorTabs bind:editedContent initialContent={page.content} />
{:else}
  <Loader />
{/if}

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
  }
</style>
