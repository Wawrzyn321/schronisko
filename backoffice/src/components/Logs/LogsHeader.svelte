<script lang="ts">
  import { Field, Input } from 'svelma';
  import type { LogsFilteringParams } from './LogsFilteringParams';
import TimeInput from './TimeInput.svelte';

  export let filteringParams: LogsFilteringParams;
</script>

<header>
  <div class="g-flex-between-100">
    <h1>Logi</h1>
  </div>
  <div class="g-flex-between-100" style="margin-top: 16px">
    <Field label="ID użytkownika">
      <Input
        type="search"
        bind:value={filteringParams.userIdFilter}
        placeholder="ID użytkownika"
      />
    </Field>
    <Field label="Login">
      <Input
        type="search"
        bind:value={filteringParams.loginFilter}
        placeholder="Login"
      />
    </Field>
    <Field label="Akcja">
      <Input
        type="search"
        bind:value={filteringParams.searchPhrase}
        placeholder="Akcja"
      />
    </Field>
    <TimeInput bind:time={filteringParams.timeFrom} label="Od" />
    <TimeInput bind:time={filteringParams.timeEnd} label="Do" />
  </div>
</header>

<style lang="scss">
  header {
    margin-bottom: 32px;
  }
</style>
