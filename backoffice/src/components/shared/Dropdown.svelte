<script lang="ts">
  let isOpen = false;
  let dropdownRef: HTMLDivElement;

  function onClick(e: MouseEvent) {
    if (dropdownRef !== e.target && !dropdownRef.contains(e.target as Node)) {
      isOpen = false;
    }
  }

  function toggleDropdown() {
    isOpen = !isOpen;
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', onClick);
      });
    }
  }

  function windowKeyDown(e: KeyboardEvent) {
    const ESCAPE_KEY = 'Escape';
    if (isOpen && e.key === ESCAPE_KEY) {
      isOpen = false;
    }
  }

  $: if (!isOpen) {
    document.removeEventListener('click', onClick);
  }
</script>

<svelte:window on:keydown={windowKeyDown} />
<div>
  <button class="transparent-button" on:click={toggleDropdown}>
    <slot name="trigger" />
  </button>
  {#if isOpen}
    <div bind:this={dropdownRef} class="dropdown">
      <slot name="content" />
    </div>
  {/if}
</div>

<style lang="scss">
  .dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
  }

  .transparent-button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
</style>
