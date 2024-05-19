<script lang="ts">
  import { Button, Input } from 'svelma';
  import Field from './Field.svelte';
  import ImageResizeModal from './ImageResizeModal/ImageResizeModal.svelte';

  export let imageData: string | null = '';
  export let imageName: string | null = null;
  export let label: string;
  export let message: string | null= null;
  export let revalidateForm: () => void = () => {};
  export let width: number;
  export let height: number;
  export let required = true;
  export let disabled = false;

  let file: File | null = null;
  let resizeModalVisible = false;
  let forceRefresh = false;

  interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  async function onFileChange(e: HtmlInputEvent) {
    if (!e.target) return;
    file = e.target.files?.[0] ?? null;
    openResizeModal();
    // @ts-ignore
    e.target.value = null;
  }

  function openResizeModal() {
    resizeModalVisible = true;
    forceRefresh = true;
  }
</script>

<Field {label} {message} noStar={!label} {required} class="aaaa">
  <div style="display: flex">
    <Input
      type="file"
      accept="image/png, image/jpeg"
      on:input={onFileChange}
      aria-label="Wybierz obraz"
      {disabled}
    />
    <Button on:click={openResizeModal} disabled={!file || disabled}
      >Przytnij</Button
    >
    <Button
      type="is-danger"
      on:click={() => {
        imageData = '';
        imageName = '';
        file = null;
      }}
      disabled={!(file || imageData || imageName) || disabled}
    >
      Usuń
    </Button>
  </div>
</Field>
<ImageResizeModal
  title={label}
  {file}
  bind:forceRefresh
  setImageData={(data) => {
    imageData = data;
    revalidateForm && revalidateForm();
  }}
  bind:modalVisible={resizeModalVisible}
  defaultWidth={width}
  defaultHeight={height}
/>

<style lang="scss">
  :global(.aaaa) {
    display: flex;
    align-items: center;
    gap: 4px;
    margin: unset !important;
  }
</style>
