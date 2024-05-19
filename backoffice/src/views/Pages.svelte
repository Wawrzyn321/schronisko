<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { Edit2Icon } from 'svelte-feather-icons';
  import type { PageListElement } from '../services/PageService';
  import { pageService } from '../services/PageService';
  import { notifyError } from '../contexts/notification.context';
  import Loader from '../components/shared/Loader.svelte';
  import EmptyListMessage from '../components/shared/EmptyListMessage.svelte';
  import Pagination from '../components/shared/Pagination/Pagination.svelte';
  import { paginate } from '../components/shared/Pagination/pagination';
  import { ExternalLinkIcon } from 'svelte-feather-icons';
  import { MAIN_PAGE_URL, PAGE_MAP } from '../config';
  import PageExternalLink from '../components/Pages/PageExternalLink.svelte';

  let pages: PageListElement[] = [];
  let searchPhrase = '';
  let loading = false;

  let currentPage = 0;
  let pageSize = 10;

  onMount(async () => {
    loading = true;
    try {
      pages = await pageService.getInitial();
      loading = false;
      pages = await pageService.getAll();
    } catch (e) {
      notifyError({ message: 'Nie można pobrać stron: ' + e.message });
    }
  });

  $: filteredPages = pages.filter((page: PageListElement) => {
    const includes = (prop: string) =>
      prop.toLowerCase().includes(searchPhrase.toLowerCase());

    return !searchPhrase || includes(page.title) || includes(page.id);
  });

  $: paginatedPages = paginate(filteredPages, pageSize, currentPage);
</script>

<main>
  <header>
    <div class="g-flex-between-100">
      <h1>Strony</h1>
      <input placeholder="Szukaj..." type="search" bind:value={searchPhrase} />
    </div>
    <p class="g-description">
      Tutaj znajduje się spis statycznych stron, na stałe osadzonych na głównej
      stronie.
    </p>
  </header>
  <table class="table is-fullwidth">
    <tr>
      <th>Tytuł</th>
      <th>Id</th>
      <th class="g-table-actions" />
    </tr>
    {#each paginatedPages as page}
      <tr>
        <td>
          <a href={`/#/pages/${page.id}?mode=view`}>{page.title}</a>
        </td>
        <td>
          {page.id}
        </td>
        <td class="g-text-align-right g-table-actions">
          <Button
            type="is-primary"
            on:click={() => push(`/pages/${page.id}?mode=edit`)}
          >
            <Edit2Icon size="1.0x" />
          </Button>
          <PageExternalLink {page} />
        </td>
      </tr>
    {/each}
  </table>
  {#if loading}
    <Loader />
  {/if}
  {#if !loading && !filteredPages.length}
    <EmptyListMessage entityType="stron" />
  {/if}
  {#if !loading && pages.length}
    <Pagination
      bind:pageSize
      itemsCount={filteredPages.length}
      bind:currentPage
    />
  {/if}
</main>

<style lang="scss">
  header {
    margin-bottom: 32px;
  }
</style>
