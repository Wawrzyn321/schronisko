<script lang="ts">
  import { Toast } from 'svelma';
  import { onMount } from 'svelte';
  import EditorTabs from '../components/EditorTabs.svelte';
  import NewsForm from '../components/News/NewsForm.svelte';
  import UpdateHeader from '../components/News/UpdateHeader.svelte';
  import type { News } from '../News';

  import { newsService } from '../services/NewsService';

  export let params: { id: string };
  const id = params.id;

  let news: News;
  let editedContent: string;
  let isValid: boolean = true;

  onMount(async () => {
    news = await newsService.get(id);
    editedContent = news.content;
  });

  async function updateNews() {
    await newsService.update({...news, content: editedContent});
    Toast.create({
      message: 'Post został zapisany',
      type: 'is-success',
      position: 'is-bottom',
    });
  }
</script>

<main>
  {#if !!news}
    <UpdateHeader timestamp={news.createdAt} {updateNews} {isValid} bind:isPublished={news.isPublished} />
    <NewsForm
      bind:title={news.title}
      setFormValid={(valid) => (isValid = valid)}
    />
    <EditorTabs bind:editedContent={editedContent} initialContent={news.content} />
  {:else}
    Ładowanie...
  {/if}
</main>
