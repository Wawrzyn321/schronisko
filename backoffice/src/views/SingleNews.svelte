<script lang="ts">
  import type { News } from '.prisma/client';
  import { Tab, Toast } from 'svelma';
  import { onMount } from 'svelte';
  import EditorTabs from '../components/EditorTabs.svelte';
  import NewsForm from '../components/News/NewsForm.svelte';
  import UpdateHeader from '../components/News/UpdateHeader.svelte';

  import { newsService } from '../services/NewsService';

  export let params: { id: string };
  const id = params.id;

  let news: News;
  let editedContent: string;
  let isValid: boolean = true;
  let imageData = '';

  onMount(async () => {
    news = await newsService.get(id);
    editedContent = news.content;
  });

  async function updateNews() {
    await newsService.update({ ...news, content: editedContent }, imageData);
    Toast.create({
      message: 'Post został zapisany',
      type: 'is-success',
      position: 'is-bottom',
    });
  }
</script>

<main>
  {#if !!news}
    <UpdateHeader
      timestamp={news.createdAt}
      {updateNews}
      {isValid}
      bind:isPublished={news.isPublished}
    />
    <EditorTabs bind:editedContent initialContent={news.content}>
      <Tab label="Dane">
        <NewsForm {news} bind:imageData={imageData} setFormValid={(valid) => (isValid = valid)} />
      </Tab>
    </EditorTabs>
  {:else}
    Ładowanie...
  {/if}
</main>
