<script lang="ts">
  import { Button, Field, Input } from 'svelma';
  import { Trash2Icon } from 'svelte-feather-icons';

  export let time: Date | null;
  export let label: string;
</script>

<div class="time-input">
  <Field {label}>
    <Input type="datetime-local" bind:value={time} placeholder={label} />
  </Field>
  <Button type="is-danger" on:click={() => (time = null)}>
    <Trash2Icon size="1.0x" />
  </Button>
</div>

<style lang="scss">
  .time-input {
    display: flex;

    :global(button) {
      margin-top: 32px !important;
    }
  }
</style>
