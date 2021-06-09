<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { Edit2Icon, EyeIcon } from 'svelte-feather-icons';
  import { pageService } from '../services/PageService';
  import type { PageListElement } from '../prisma-types/Page';

  let pages: PageListElement[] = [];
  let searchPhrase = '';
  onMount(async () => (pages = await pageService.getAll()));

  $: filteredPages = pages.filter(
    (p: PageListElement) =>
      !searchPhrase ||
      p.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );
</script>

<main>
  <header>
    <div class="g-flex-between-100">
      <h1>Strony</h1>
      <input placeholder="Szukaj..." bind:value={searchPhrase} />
    </div>
    <p class="g-description">
      Tutaj znajduje się spis statycznych stron, na stałe osadzonych na głównej
      stronie.
    </p>
  </header>
  <table class="table is-fullwidth">
    <tr>
      <th>Tytuł</th>
      <th class="g-actions-header" />
    </tr>
    {#each filteredPages as page}
      <tr>
        <td>
          <a href={`/#/pages/${page.id}`}>{page.title}</a>
        </td>
        <td class="g-text-align-right g-actions-header">
          <Button type="is-primary" on:click={() => push(`/pages/${page.id}`)}>
            <Edit2Icon size="1.0x" />
          </Button>
        </td>
      </tr>
    {/each}
  </table>
</main>

<style lang="scss">
  header {
    margin-bottom: 32px;
  }
</style>
