<script lang="ts">
  import { Toast } from 'svelma';
  import { onMount } from 'svelte';
  import { newsService } from '../services/NewsService';
  import Header from '../components/News/Header.svelte';
  import List from '../components/News/List.svelte';
  import type { News } from '.prisma/client';
  import type { NewsListElement } from '../prisma-types/News';

  let news: NewsListElement[] = [];
  let searchPhrase = '';
  let filteredNews: NewsListElement[];

  onMount(async () => (news = await newsService.getAll()));

  $: {
    const searchLower = searchPhrase.toLowerCase();
    filteredNews = news.filter(
      (newsPiece: NewsListElement) =>
        !searchPhrase ||
        newsPiece.title.toLowerCase().includes(searchLower) ||
        newsPiece.description.toLowerCase().includes(searchLower)
    );
  }

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
  <List news={filteredNews} {onNewsDeleted} />
</main>
