<script lang="ts">
  import { Field, Input, Button } from 'svelma';
  import DeleteLogsModal from './DeleteLogsModal.svelte';
  import type { LogsFilteringParams } from './LogsFilteringParams';
  import TimeInput from './TimeInput.svelte';

  let deleteLogsModalVisible = false;

  export let onLogsDeleted: () => any;
  export let filteringParams: LogsFilteringParams;
</script>

<header>
  <div class="g-flex-between-100">
    <h1>Logi</h1>
    <div class="g-header-actions">
      <label>
        <input
          checked={filteringParams.hideSelf}
          type="checkbox"
          on:change={() =>
            (filteringParams.hideSelf = !filteringParams.hideSelf)}
        />
        Ukryj własne logi
      </label>
      <Button type="is-danger" on:click={() => (deleteLogsModalVisible = true)}>
        Usuń logi
      </Button>
    </div>
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
<DeleteLogsModal bind:modalVisible={deleteLogsModalVisible} {onLogsDeleted} />

<style lang="scss">
  header {
    margin-bottom: 32px;
  }

  label {
    margin-right: 10px;
  }
</style>
