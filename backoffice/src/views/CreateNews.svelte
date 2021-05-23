<script lang="ts">
  import { Toast, Tab } from 'svelma';
  import { push } from 'svelte-spa-router';
  import EditorTabs from '../components/EditorTabs.svelte';
  import CreateHeader from '../components/News/CreateHeader.svelte';
  import NewsForm from '../components/News/NewsForm.svelte';
  import { newsService } from '../services/NewsService';

  let isValid: boolean = false;
  let content = '';
  let news = {
    title: '',
    description: '',
    isPublished: false,
  };
  let imageData = '';

  async function createNews() {
    const { id } = await newsService.create(
      {
        ...news,
        content,
      },
      imageData
    );
    push(`/news/${id}`);
    Toast.create({
      message: 'Post został utworzony',
      type: 'is-success',
      position: 'is-bottom',
    });
  }
</script>

<main>
  <CreateHeader {createNews} {isValid} bind:isPublished={news.isPublished} />
  <EditorTabs bind:editedContent={content}>
    <Tab label="Dane">
      <NewsForm bind:imageData={imageData} {news} setFormValid={(valid) => (isValid = valid)} />
    </Tab>
  </EditorTabs>
</main>
