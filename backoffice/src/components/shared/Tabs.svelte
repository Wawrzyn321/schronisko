<script lang="ts">
  import { Tabs } from 'svelma';
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';

  let active: number;
  let tabs: any;

  export let mapping: Array<string> | undefined = undefined;
  export let currentTab: string;

  $: active !== undefined && tabs && tabs.setActive(active);

  $: {
    if (mapping && active !== undefined && active >= 0) {
      push(
        window.location.hash.replace(/\?mode=.*$/, '').substr(1) +
          `?mode=${mapping[active]}`
      );
    }
  }
  onMount(() => {
    if (!mapping) {
      tabs.setActive(0);
    } else {
      const tabIndex =
        mapping.indexOf(currentTab) !== -1 ? mapping.indexOf(currentTab) : 0;
      tabs.setActive(tabIndex);
    }
  });
</script>

<Tabs bind:this={tabs} bind:active><slot /></Tabs>
