<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Button } from 'svelma';

  export let isOpen: boolean;
  export let title: string;
  export let confirmText: string = 'OK';
  export let id: string | undefined = undefined;
  export let onConfirm: () => any;
  export let disabledConfirm: boolean = false;
  export let cancelText: string = 'Anuluj';

  const close = () => (isOpen = false);

  const closeOnEsc = (e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      close();
    }
  };

  const confirm = async () => {
    if ((await onConfirm()) !== false) {
      close();
    }
  };

  onDestroy(close);
</script>

<svelte:window on:keydown={closeOnEsc}/>
{#if isOpen}
  <div {id}>
    <!-- <div class="bg" style={`display: ${isOpen ? 'flex' : 'none'}`}>
    <dialog open={isOpen}> -->
    <div class="bg">
      <dialog open>
        <header>
          <h2>{title}</h2>
          <Button type="is-light" on:click={close}>&times;</Button>
        </header>
        <div class="modal-content">
          <slot />
        </div>
        {#if confirmText || cancelText}
          <footer>
            <slot name="footer" />
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
      </dialog>
    </div>
  </div>
{/if}

<style lang="scss">
  dialog {
    border: none;
    padding: 0;
  }

  .bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    top: 0;
    left: 0;
    place-items: center;
    display: flex;
    background: rgba(0, 0, 0, 0.6);
  }

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
    margin-left: 8px;
    margin-top: 8px;
  }

  header,
  footer {
    padding: 8px;
  }
  .modal-content {
    padding: 16px 16px 0;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid lightgray;
    margin-top: 16px;
  }

  :global(.modal-confirm) {
    margin-left: 8px;
  }
</style>
