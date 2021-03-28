<script lang="ts">
  //title={ACCESS_STRATEGIES_PANEL.LIST.TITLE}
  //showSearchField={showSearchField}
  //textSearchProperties={textSearchProperties}
  // noSearchResultMessage={
  export let entries: any[];
  export let headerRenderer: string[];
  export let rowRenderer: any;
</script>

<table class="table is-fullwidth">
  <tr>
    {#each headerRenderer as header}
      <th>{header}</th>
    {/each}
  </tr>
  {#each entries as entry}
    <svelte:component this={rowRenderer} {entry} />
  {/each}
</table>