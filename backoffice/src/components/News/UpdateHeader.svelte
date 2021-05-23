<script lang="ts">
  import { Button } from 'svelma';
  import DateFromTimestamp from '../DateFromTimestamp.svelte';

  export let isPublished: boolean;
  export let timestamp: any;
  export let isValid: boolean;
  export let updateNews: () => any;
</script>

<header>
  <h1>Edycja newsa</h1>
  <span>
    Utworzony:
    <DateFromTimestamp {timestamp} />
  </span>
  <div>
    <label>
      <input
        checked={isPublished}
        type="checkbox"
        on:change={() => (isPublished = !isPublished)}
      />
      Publiczny
    </label>
    <Button type="is-primary" disabled={!isValid} on:click={updateNews}>
      Zapisz
    </Button>
  </div>
</header>

<style lang="scss">
  header {
    & > div {
      display: flex;
      align-items: center;
    }

    label {
      margin-right: 16px;
    }
  }
</style>
