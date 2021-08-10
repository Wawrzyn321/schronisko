<script lang="ts">
  import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
  } from 'svelte-feather-icons';

  export let pageSize = 10;
  export let itemsCount: number;
  export let currentPage = 0;

  $: pagesCount = Math.ceil(itemsCount / pageSize);

  $: if (currentPage >= pagesCount) currentPage = 0;
</script>

{#if pagesCount > 1}
  <ul class="d-flex centered">
    <button
      class="link"
      disabled={currentPage === 0}
      on:click={() => currentPage--}
    >
      <ArrowLeftCircleIcon size="1.0x" />
    </button>
    {#each Array(pagesCount) as _, i}
      <li>
        <button
          class={`link ${i === currentPage ? 'active' : ''}`}
          on:click={() => (currentPage = i)}
        >
          {i + 1}
        </button>
      </li>
    {/each}
    <button
      class="link"
      disabled={currentPage === pagesCount - 1}
      on:click={() => currentPage++}
    >
      <ArrowRightCircleIcon size="1.0x" />
    </button>
  </ul>
{/if}
<div class="d-flex centered">
  Na stronie:
  <ul class="d-flex">
    {#each [10, 20, 50] as i}
      <li>
        <button
          disabled={i === pageSize}
          class={`link ${i === pageSize ? 'active' : ''}`}
          on:click={() => (pageSize = i)}
        >
          {i}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  ul {
    list-style-type: none;
  }

  .d-flex {
    display: flex;
    justify-content: center;
  }

  .centered {
    margin: 0 auto;
    padding-bottom: 16px;
  }

  .active {
    font-weight: bolder;
  }
</style>
