<script lang="ts">
  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { Edit2Icon, EyeIcon } from 'svelte-feather-icons';
  import type { ConstPostListElement } from '../services/ConstPostService';
  import { constPostService } from '../services/ConstPostService';

  let constPosts: ConstPostListElement[] = [];
  onMount(async () => (constPosts = await constPostService.getAll()));
</script>

<table class="table is-fullwidth">
  <tr>
    <th>Nazwa</th>
    <th class="actions-header" />
  </tr>
  {#each constPosts as constPost}
    <tr>
      <td><a href={`/#/const-posts/${constPost.id}?mode=preview`}>{constPost.name}</a></td>
      <td class="text-align-right actions-header">
        <Button type="is-primary" on:click={() => push(`/const-posts/${constPost.id}?mode=edit`)}>
          <Edit2Icon size="1.0x" />
        </Button>
      </td>
    </tr>
  {/each}
</table>
