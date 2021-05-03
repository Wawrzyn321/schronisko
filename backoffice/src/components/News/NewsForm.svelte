<script lang="ts">
  import { Field, Input } from 'svelma';

  export let title = '';
  export let setFormValid: (valid: boolean) => any;

  let form: HTMLFormElement;
</script>

<form
  class="news-form"
  bind:this={form}
  on:input={setFormValid(form.checkValidity())}
>
  <Field label="Tytuł">
    <Input required bind:value={title} placeholder="Tytuł" />
  </Field>
</form>

<style lang="scss">
  .news-form {
    margin-top: 16px;
    margin-bottom: 16px;

    :global(input) {
      max-width: 50%;
    }
  }
</style>
