<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { Edit2Icon, Trash2Icon } from 'svelte-feather-icons';
  import type { NewsListElement } from '../../services/NewsService';
  import DeleteNewsModal from './DeleteNewsModal.svelte';
  import DateFromTimestamp from '../DateFromTimestamp.svelte';

  export let news: NewsListElement[];
  export let onNewsDeleted: (news: NewsListElement) => any;

  let deleteModalVisible = false;
  let selectedNews: NewsListElement = null;
</script>

<table class="table is-fullwidth">
  <tr>
    <th>Nazwa</th>
    <th>Data utworzenia</th>
    <th>Opublikowany?</th>
    <th class="text-align-right actions-header" />
  </tr>
  {#each news as singleNews}
    <tr>
      <td>
        <a href={`/#/news/${singleNews.id}?mode=preview`}>
          {singleNews.title}
        </a>
      </td>
      <td>
        <DateFromTimestamp timestamp={singleNews.createdAt} />
      </td>
      <td>
        {singleNews.isPublished ? 'TAK' : 'NIE'}
      </td>
      <td class="text-align-right actions-header">
        <Button
          type="is-primary"
          on:click={() => push(`/news/${singleNews.id}?mode=edit`)}
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
<DeleteNewsModal
  bind:modalVisible={deleteModalVisible}
  {onNewsDeleted}
  news={selectedNews}
/>
