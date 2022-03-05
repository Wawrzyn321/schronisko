<script lang="ts">
  import { Tab } from 'svelma';
  import { push, querystring } from 'svelte-spa-router';
  import EditorTabs from '../components/shared/EditorTabs.svelte';
  import CreateNewsHeader from '../components/News/CreateNewsHeader.svelte';
  import NewsForm from '../components/News/NewsForm.svelte';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import { newsService } from '../services/NewsService';
  import type { FileMap } from '../components/shared/Editor/FileMap';
  import { get } from 'svelte/store';

  const mode = new URLSearchParams(get(querystring)).get('mode');

  let isValid: boolean = false;
  let content = '';
  let news = {
    title: '',
    description: '',
    isPublished: false,
  };
  let fileMap: FileMap = [];
  let imageData = '';


  async function createNews() {
    try {
      const { id } = await newsService.create(
        {
          ...news,
          content,
        },
        fileMap,
        imageData
      );
      push(`/news/${id}`);
      notifySuccess({ message: 'News został utworzony.' });
    } catch (e) {
      notifyError({ message: 'Nie można utworzyć newsa: ' + e.message });
    }
  }
</script>

<main>
  <CreateNewsHeader
    {createNews}
    {isValid}
    bind:isPublished={news.isPublished}
  />
  <EditorTabs
    title={news.title}
    contentForPreview={content}
    currentTab={mode}
    mapping={['data', 'edit', 'view']}
    onChange={(_content, _fileMap) => {
      content = _content;
      fileMap = _fileMap;
    }}
    initialContent=""
  >
    <Tab label="Dane">
      <NewsForm
        bind:imageData
        bind:news
        setFormValid={(valid) => (isValid = valid)}
      />
    </Tab>
  </EditorTabs>
</main>
