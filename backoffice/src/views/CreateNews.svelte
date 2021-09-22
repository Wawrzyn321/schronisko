<script lang="ts">
  import { Tab } from 'svelma';
  import { push } from 'svelte-spa-router';
  import EditorTabs from '../components/shared/EditorTabs.svelte';
  import CreateNewsHeader from '../components/News/CreateNewsHeader.svelte';
  import NewsForm from '../components/News/NewsForm.svelte';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
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
    try {
      const { id } = await newsService.create(
        {
          ...news,
          content,
        },
        imageData
      );
      push(`/news/${id}`);
      notifySuccess({ message: 'Post został utworzony.' });
    } catch (e) {
      notifyError({ message: 'Nie można utworzyć posta: ' + e.message });
    }
  }
</script>

<main>
  <CreateNewsHeader
    {createNews}
    {isValid}
    bind:isPublished={news.isPublished}
  />
  <EditorTabs bind:editedContent={content}>
    <Tab label="Dane">
      <NewsForm
        bind:imageData
        {news}
        setFormValid={(valid) => (isValid = valid)}
      />
    </Tab>
  </EditorTabs>
</main>
