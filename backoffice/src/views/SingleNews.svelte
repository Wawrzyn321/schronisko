<script lang="ts">
  import type { News } from '.prisma/client';
  import { Tab } from 'svelma';
  import { push, querystring } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import Loader from '../components/shared/Loader.svelte';
  import EditorTabs from '../components/shared/EditorTabs.svelte';
  import NewsForm from '../components/News/NewsForm.svelte';
  import UpdateHeader from '../components/News/UpdateHeader.svelte';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import { newsService } from '../services/NewsService';
  import { get } from 'svelte/store';

  export let params: { id: string };

  const mode = new URLSearchParams(get(querystring)).get('mode');

  let news: News;
  let editedContent: string;
  let isValid: boolean = true;
  let imageData = '';

  onMount(async () => {
    try {
      news = await newsService.get(params.id);
      editedContent = news.content;
    } catch (e) {
      notifyError({ message: 'Nie można pobrać newsa: ' + e.message });
      if (e.status === 404) {
        push('/news');
      }
    }
  });

  async function updateNews() {
    try {
      await newsService.update({ ...news, content: editedContent }, imageData);
      notifySuccess({ message: 'News został zapisany.' });
    } catch (e) {
      notifyError({ message: 'Nie możnac zapisać newsa: ' + e.message });
    }
  }
</script>

<main>
  {#if !!news}
    <UpdateHeader
      timestamp={news.createdAt}
      {updateNews}
      {isValid}
      {news}
      bind:isPublished={news.isPublished}
    />
    <EditorTabs
      bind:editedContent
      initialContent={news.content}
      mapping={['data', 'edit', 'view']}
      currentTab={mode}
    >
      <Tab label="Dane">
        <NewsForm
          {news}
          bind:imageData
          setFormValid={(valid) => (isValid = valid)}
        />
      </Tab>
    </EditorTabs>
  {:else}
    <Loader />
  {/if}
</main>
