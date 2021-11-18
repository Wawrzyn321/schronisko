<script lang="ts">
  import { Input, Tab, Tooltip, Button } from 'svelma';
  import type { AnimalData } from '../../../services/AnimalsService';
  import Field from '../../shared/Field.svelte';
  import { descriptionTemplates } from './descriptionTemplates';

  export let revalidateForm: () => any;
  export let animal: AnimalData;

  const descriptionTemplate =
    descriptionTemplates[animal.category]?.[animal.gender];
</script>

<Tab label="Opis">
  <div class="flex-between">
    <Field label="Opis" required />
    {#if descriptionTemplate}
      <Button
        type="is-primary"
        on:click={() => {
          animal.description = descriptionTemplate;
          revalidateForm();
        }}
      >
        Użyj szablonu
      </Button>
    {:else}
      <Tooltip
        position="is-left"
        label={'Tylko kategorie "Do adopcji" oraz "Niedawno znalezione" posiadają szablony.'}
      >
        <Button type="is-primary" disabled>Użyj szablonu</Button>
      </Tooltip>
    {/if}
  </div>
  <Tooltip label="Opis widoczny na stronie.">
    <Input
      required
      maxlength="1500"
      bind:value={animal.description}
      type="textarea"
      placeholder="Opis zwierzęcia"
    />
  </Tooltip>
  <br />
  <Field label="Notatka">
    <Tooltip label="Notatka dla pracowników, niewidoczna na stronie głównej.">
      <Input
        maxlength="200"
        bind:value={animal.note}
        type="textarea"
        placeholder="Notatka"
      />
    </Tooltip>
  </Field>
</Tab>

<style lang="scss">
  .flex-between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
</style>
