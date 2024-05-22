<script lang="ts">
  import { onMount } from 'svelte';
  import { querystring, push } from 'svelte-spa-router';
  import { get } from 'svelte/store';
  import { Button, Input } from 'svelma';
  import { pageService } from '../services/PageService';
  import EditorTabs from '../components/shared/EditorTabs.svelte';
  import type { Page } from '@prisma-app/client';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import Loader from '../components/shared/Loader.svelte';
  import type { FileMap } from '../components/shared/Editor/FileMap';
  import AboutSubstitutions from '../components/shared/AboutSubstitutions.svelte';
  import Field from '../components/shared/Field.svelte';
  import PageExternalLink from '../components/Pages/PageExternalLink.svelte';

  export let params: { id: string };

  const id = params.id;
  const mode = new URLSearchParams(get(querystring)).get('mode') ?? 'edit';

  let page: Page;
  let editedContent = '';
  let fileMap: FileMap = [];
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

  async function savePage() {
    if (isSaving || !page.title) return;

    try {
      isSaving = true;
      await pageService.save({ ...page, content: editedContent }, fileMap);
      notifySuccess({ message: 'Zmiany zostały zapisane' });
      page.content = editedContent;
    } catch (e) {
      notifyError({ message: 'Nie można zapisać strony: ' + e.message });
    } finally {
      isSaving = false;
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
      <div class="page__header-right">
        <span>ID: <em>{page.id}</em></span>
        <Button
          type="is-primary"
          disabled={isSaving || !page.title}
          loading={isSaving}
          on:click={savePage}
        >
          Zapisz
        </Button>
        <PageExternalLink {page} />
      </div>
    </header>
    <div style="display: flex; justify-content: space-between">
      <div style="width: 300px; margin-right: 16px">
        <Field label="Tytuł">
          <Input required bind:value={page.title} placeholder="Tytuł strony" pattern=".*\S+.*" />
        </Field>
      </div>
      <AboutSubstitutions />
    </div>
    <EditorTabs
      title={page.title}
      contentForPreview={editedContent}
      mapping={['edit', 'view']}
      currentTab={mode}
      onChange={(content, _fileMap) => {
        editedContent = content;
        fileMap = _fileMap;
      }}
      initialContent={page.content}
      requestSave={savePage}
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

  .page__header-right {
    display: flex;
    place-items: center;
    column-gap: 4px;
  }

  em {
    font-style: italic;
  }
</style>
