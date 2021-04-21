<script lang="ts">
import type { ListAction } from "./ListAction";
  //showSearchField={showSearchField}
  //textSearchProperties={textSearchProperties}
  // noSearchResultMessage={
  export let entries: any[];
  export let headerRenderer: string[];
  export let rowRenderer: any;
  export let actions: (entry: any) => ListAction[];
</script>

<table class="table is-fullwidth">
  <tr>
    {#each headerRenderer as header}
      <th>{header}</th>
    {/each}
  </tr>
  {#each entries as entry}
    <svelte:component this={rowRenderer} {entry} actions={actions(entry)}/>
  {/each}
</table>

<style>
  :global(td) {
    vertical-align: middle !important;
  }
</style>