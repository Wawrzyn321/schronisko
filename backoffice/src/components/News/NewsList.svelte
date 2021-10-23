<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { Edit2Icon, Trash2Icon } from 'svelte-feather-icons';
  import type { NewsListElement } from '../../services/NewsService';
  import DeleteNewsModal from './DeleteNewsModal.svelte';
  import DateFromTimestamp from '../shared/DateFromTimestamp.svelte';
  import Loader from '../shared/Loader.svelte';
  import EmptyListMessage from '../shared/EmptyListMessage.svelte';
  import { STATIC_URL } from '../../services/config';

  export let news: NewsListElement[];
  export let onNewsDeleted: (news: NewsListElement) => any;
  export let loading: boolean;

  let deleteModalVisible = false;
  let selectedNews: NewsListElement = null;
</script>

<table class="table is-fullwidth">
  <tr>
    <th>Miniaturka</th>
    <th>Nazwa</th>
    <th>Opis</th>
    <th>Data utworzenia</th>
    <th>Opublikowany?</th>
    <th class="g-text-align-right g-table-actions" />
  </tr>
  {#each news as singleNews}
    <tr>
      <td>
        <a href={`/#/news/${singleNews.id}`}>
          <img
            width={152}
            height={112}
            src={`${STATIC_URL}/news/${singleNews.imageName}`}
            alt={singleNews.title}
          />
        </a>
      </td>
      <td>
        <a href={`/#/news/${singleNews.id}`}>
          {singleNews.title}
        </a>
      </td>
      <td>
        {singleNews.description}
      </td>
      <td>
        <DateFromTimestamp timestamp={singleNews.createdAt} />
      </td>
      <td>
        {singleNews.isPublished ? 'TAK' : 'NIE'}
      </td>
      <td class="g-text-align-right g-table-actions">
        <Button
          type="is-primary"
          on:click={() => push(`/news/${singleNews.id}`)}
        >
          <Edit2Icon size="1.0x" />
        </Button>
        <Button
          type="is-danger"
          on:click={() => {
            selectedNews = singleNews;
            deleteModalVisible = true;
          }}
        >
          <Trash2Icon size="1.0x" />
        </Button>
      </td>
    </tr>
  {/each}
</table>
{#if !loading && !news.length}
  <EmptyListMessage entityType="newsów" />
{/if}
{#if loading}
  <Loader />
{/if}
<DeleteNewsModal
  bind:modalVisible={deleteModalVisible}
  {onNewsDeleted}
  news={selectedNews}
/>
