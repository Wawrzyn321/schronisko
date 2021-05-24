<script lang="ts">
  import { Button } from 'svelma';

  export let isPublished: boolean;
  export let isValid: boolean;
  export let createNews: () => any;
</script>

<header class="g-flex-between-100">
  <h1>Utwórz newsa</h1>
  <div>
    <label>
      <input
        checked={isPublished}
        type="checkbox"
        on:change={() => (isPublished = !isPublished)}
      />
      Publiczny
    </label>
    <Button type="is-primary" disabled={!isValid} on:click={createNews}>
      Utwórz
    </Button>
  </div>
</header>

<style lang="scss">
  label {
    margin-right: 16px;
  }
</style>
