<script lang="ts">
  import { onMount } from 'svelte';
  import type { NewsListElement } from '../services/NewsService';
  import { newsService } from '../services/NewsService';
  import NewsHeader from '../components/News/NewsHeader.svelte';
  import NewsList from '../components/News/NewsList.svelte';
  import type { News } from '.prisma/client';
  import { notifyError, notifySuccess } from '../contexts/notification.context';

  let news: NewsListElement[] = [];
  let searchPhrase = '';

  onMount(async () => {
    try {
      news = await newsService.getAll();
    } catch (e) {
      notifyError({ message: 'Nie można pobrać newsów: ' + e.message });
    }
  });

  $: filteredNews = news.filter(filterNews(searchPhrase));

  const filterNews = (searchPhrase: string) => (newsPiece: NewsListElement) =>
    !searchPhrase ||
    newsPiece.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
    newsPiece.description.toLowerCase().includes(searchPhrase.toLowerCase());

  function onNewsDeleted(n: News) {
    news = news.filter((n) => n.id !== n.id);
    notifySuccess({ message: `Usunięto newsa ${n.title}` });
  }
</script>

<main>
  <NewsHeader bind:searchPhrase />
  <NewsList news={filteredNews} {onNewsDeleted} />
</main>
