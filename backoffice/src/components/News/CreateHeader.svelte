<script lang="ts">
  import { Button } from 'svelma';

  export let isPublished: boolean;
  export let isValid: boolean;
  export let createNews: () => any;
</script>

<header>
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
  header {
    margin-bottom: 0;
    
    & > div {
      display: flex;
      align-items: center;
    }

    label {
      margin-right: 16px;
    }
  }
</style>
