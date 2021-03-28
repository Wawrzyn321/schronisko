<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Button } from 'svelma';

  export let isOpen: boolean;
  export let title: string;
  export let confirmText: string = 'OK';
  export let onConfirm: () => any;
  export let disabledConfirm: boolean = false;
  export let cancelText: string = 'Anuluj';

  const close = () => (isOpen = false);

  const confirm = async () => {
    if ((await onConfirm()) !== false) {
      close();
    }
  };

  onDestroy(close);
</script>

<div>
  <header>
    <h2>{title}</h2>
    <Button type="is-light" on:click={close}>&times;</Button>
  </header>
  <div class="content">
    <slot />
  </div>
  {#if confirmText || cancelText}
    <footer>
      {#if cancelText}
        <Button type="is-light" on:click={close}>{cancelText}</Button>
      {/if}
      {#if confirmText}
        <Button
          class="modal-confirm"
          type="is-primary"
          disabled={disabledConfirm}
          on:click={confirm}
          >{confirmText}
        </Button>
      {/if}
    </footer>
  {/if}
</div>

<style lang="scss">
  div {
    width: 500px;
    background: white;
  }

  header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
  }

  h2 {
    font-size: 125%;
  }

  header,
  .content,
  footer {
    padding: 8px;
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }

  :global(.modal-confirm) {
    margin-left: 8px;
  }
</style>
