<script lang="ts">
  import { Toast } from 'svelma';
  import { push } from 'svelte-spa-router';
  import EditorTabs from '../components/EditorTabs.svelte';
  import CreateHeader from '../components/News/CreateHeader.svelte';
  import NewsForm from '../components/News/NewsForm.svelte';
  import { newsService } from '../services/NewsService';

  let isValid: boolean = false;
  let content = '';
  let title = '';
  let isPublished = false;

  async function createNews() {
    const news = await newsService.create({
      title,
      isPublished,
      content,
    });
    push(`/news/${news.id}?mode=edit`);
    Toast.create({
      message: 'Post został utworzony',
      type: 'is-success',
      position: 'is-bottom',
    });
  }
</script>

<main>
  <CreateHeader {createNews} {isValid} bind:isPublished={isPublished}/>
  <NewsForm bind:title={title} setFormValid={(valid) => (isValid = valid)} />
  <EditorTabs bind:editedContent={content} />
</main>
