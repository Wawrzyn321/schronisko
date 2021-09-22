<script lang="ts">
  import { onMount } from 'svelte';
  import type { NewsListElement } from '../services/NewsService';
  import { newsService } from '../services/NewsService';
  import NewsHeader from '../components/News/NewsHeader.svelte';
  import NewsList from '../components/News/NewsList.svelte';
  import type { News } from '.prisma/client';
  import { notifyError, notifySuccess } from '../contexts/notification.context';
  import Pagination from '../components/shared/Pagination/Pagination.svelte';
  import { paginate } from '../components/shared/Pagination/pagination';

  let news: NewsListElement[] = [];
  let searchPhrase = '';
  let loading = false;

  let currentPage = 0;
  let pageSize = 10;

  onMount(async () => {
    loading = true;
    try {
      news = await newsService.getInitial();
      loading = false;
      news = await newsService.getAll();
    } catch (e) {
      notifyError({ message: 'Nie można pobrać newsów: ' + e.message });
    }
  });

  const filterNews = (searchPhrase: string) => (newsPiece: NewsListElement) =>
    !searchPhrase ||
    newsPiece.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
    newsPiece.description.toLowerCase().includes(searchPhrase.toLowerCase());

  $: filteredNews = news.filter(filterNews(searchPhrase));

  $: paginatedNews = paginate(filteredNews, pageSize, currentPage);

  function onNewsDeleted(n: News) {
    news = news.filter((n) => n.id !== n.id);
    notifySuccess({ message: `Usunięto newsa ${n.title}.` });
  }
</script>

<main>
  <NewsHeader bind:searchPhrase />
  <NewsList news={paginatedNews} {loading} {onNewsDeleted} />
  {#if !loading && filteredNews.length}
    <Pagination
      bind:pageSize
      itemsCount={filteredNews.length}
      bind:currentPage
    />
  {/if}
</main>
