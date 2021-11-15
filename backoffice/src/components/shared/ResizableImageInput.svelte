<script lang="ts">
  import { Button, Input } from 'svelma';
  import Field from './Field.svelte';
  import ImageResizeModal from './ImageResizeModal/ImageResizeModal.svelte';

  export let imageData = '';
  export let imageName: string | null = null;
  export let label: string;
  export let message: string = null;
  export let revalidateForm: () => any = null;
  export let width: number;
  export let height: number;
  export let required = true;

  let file = null;
  let resizeModalVisible = false;
  let forceRefresh = false;

  interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  async function onFileChange(e: HtmlInputEvent) {
    if (!e.target) return;
    file = e.target.files[0];
    openResizeModal();
    e.target.value = null;
  }

  function openResizeModal() {
    resizeModalVisible = true;
    forceRefresh = true;
  }
</script>

<Field {label} {message} noStar={!label} {required}>
  <div style="display: flex">
    <Input type="file" accept="image/png, image/jpeg" on:input={onFileChange} />
    <Button on:click={openResizeModal} disabled={!file}>Przytnij</Button>
    <Button
      type="is-danger"
      on:click={() => {
        imageData = '';
        imageName = '';
        file = null;
      }}
      disabled={!(file || imageData || imageName)}
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
