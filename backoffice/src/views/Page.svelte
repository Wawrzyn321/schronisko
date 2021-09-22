<script lang="ts">
  import { onMount } from 'svelte';
  import { querystring, push } from 'svelte-spa-router';
  import { get } from 'svelte/store';
  import { Button } from 'svelma';
  import { pageService } from '../services/PageService';
  import EditorTabs from '../components/shared/EditorTabs.svelte';
  import type { Page } from '.prisma/client';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import Loader from '../components/shared/Loader.svelte';

  export let params: { id: string };
  
  const id = params.id;
  const mode = new URLSearchParams(get(querystring)).get('mode');

  let page: Page;
  let editedContent = '';
  let isSaving: boolean;

  onMount(async () => {
    try {
      page = await pageService.get(id);
      editedContent = page.content;
    } catch (e) {
      notifyError({ message: 'Nie można pobrać strony: ' + e.message });
      if (e.status === 404) {
        push('/pages');
      }
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

<main>
  {#if page}
    <header>
      <h1>
        <a href="/#/pages">Strony</a>
        <span class="g-breadcrumb-separator">/ </span>{page.title}
      </h1>
      <Button
        type="is-primary"
        disabled={isSaving || page.content === editedContent}
        loading={isSaving}
        on:click={savePost}
      >
        Zapisz
      </Button>
    </header>
    <EditorTabs
      mapping={['edit', 'view']}
      currentTab={mode}
      bind:editedContent
      initialContent={page.content}
    />
  {:else}
    <Loader />
  {/if}
</main>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
</style>
