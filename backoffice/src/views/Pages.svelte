<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { Edit2Icon, EyeIcon } from 'svelte-feather-icons';
  import type { PageListElement } from '../services/PageService';
  import { pageService } from '../services/PageService';

  let pages: PageListElement[] = [];
  let searchPhrase = '';
  let filteredPages: PageListElement[];
  onMount(async () => (pages = await pageService.getAll()));

  $: filteredPages = pages.filter(
    (p) =>
      !searchPhrase ||
      p.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );
</script>

<main>
  <header>
    <h1>Strony</h1>
    <input placeholder="Szukaj..." bind:value={searchPhrase} />
  </header>
  <table class="table is-fullwidth">
    <tr>
      <th>Tytuł</th>
      <th class="actions-header" />
    </tr>
    {#each filteredPages as page}
      <tr>
        <td>
          <a href={`/#/pages/${page.id}?mode=preview`}>{page.title}</a>
        </td>
        <td class="text-align-right actions-header">
          <Button
            type="is-primary"
            on:click={() => push(`/pages/${page.id}?mode=edit`)}
          >
            <Edit2Icon size="1.0x" />
          </Button>
        </td>
      </tr>
    {/each}
  </table>
</main>
