<script lang="ts">
  import { Toast } from 'svelma';
  import type { News, NewsListElement } from '../services/NewsService';
  import { onMount } from 'svelte';
  import { newsService } from '../services/NewsService';
  import Header from '../components/News/Header.svelte';
  import List from '../components/News/List.svelte';

  let news: NewsListElement[] = [];
  let searchPhrase = '';
  let filteredNews: NewsListElement[];
  onMount(async () => (news = await newsService.getAll()));

  $: filteredNews = news.filter(
    (p) =>
      !searchPhrase ||
      p.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );
  function onNewsDeleted(n: News) {
    news = news.filter((n) => n.id !== n.id);
    Toast.create({
      message: `Usunięto post ${n.title}`,
      type: 'is-success',
      position: 'is-bottom',
    });
  }
</script>

<main>
  <Header bind:searchPhrase />
  <List news={filteredNews} {onNewsDeleted}/>
</main>