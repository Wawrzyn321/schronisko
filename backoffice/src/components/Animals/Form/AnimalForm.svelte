<script lang="ts">
  import { Field, Input } from 'svelma';
  import type { AnimalCreateParams } from '../../../services/AnimalsService';

  import AnimalTypeSelect from './AnimalTypeSelect.svelte';
  import AnimalGenderSelect from './AnimalGenderSelect.svelte';
  import AnimalCategorySelect from './AnimalCategorySelect.svelte';
  import AnimalLocationSelect from './AnimalLocationSelect.svelte';
  import VirtualCaretakerControl from './VirtualCaretakerControl.svelte';
  import { VirtualCaretakerType } from '.prisma/client';

  export let animal: AnimalCreateParams;
  export let setFormValid: (valid: boolean) => any;

  let form: HTMLFormElement;

  function revalidateForm() {
    const isVirtualCaretakerValid =
      !!animal.virtualCaretakerName ||
      animal.virtualCaretakerType !== VirtualCaretakerType.Znalazl;

    setFormValid(form.checkValidity() && isVirtualCaretakerValid);
  }
</script>

<form bind:this={form} on:input={revalidateForm} on:change={revalidateForm}>
  <div>
    <div id="first-row">
      <Field label="Imię">
        <Input
          required
          bind:value={animal.name}
          placeholder="Imię zwierzęcia"
        />
      </Field>
      <AnimalTypeSelect bind:type={animal.type} />
      <AnimalGenderSelect bind:gender={animal.gender} />
    </div>
    <Field label="Opis">
      <Input
        required
        bind:value={animal.description}
        type="textarea"
        placeholder="Opis zwierzęcia"
      />
    </Field>
    <div id="category-and-location">
      <AnimalCategorySelect
        bind:category={animal.category}
        virtualCaretakerType={animal.virtualCaretakerType}
      />
      <AnimalLocationSelect
        bind:location={animal.location}
        type={animal.type}
      />
    </div>
    <VirtualCaretakerControl
      bind:virtualCaretakerName={animal.virtualCaretakerName}
      bind:virtualCaretakerType={animal.virtualCaretakerType}
    />
  </div>
</form>

<style lang="scss">
  form {
    margin-top: 16px;
    margin-bottom: 16px;

    @mixin grouped($cols) {
      display: grid;
      grid-gap: 32px;
      grid-template-columns: $cols;

      @media (max-width: 800px) {
        grid-template-columns: 1fr;
        grid-gap: 0;
      }
    }

    :global(#first-row) {
      @include grouped(2fr 1fr 1fr);
    }

    :global(#category-and-location) {
      @include grouped(1fr 1fr);
    }

    // .selects,
    // :global(input) {
    //   max-width: 50vw;
    // }

    // .selects > :global(*),
    // .selects :global(.control),
    // .selects :global(.select),
    // .selects :global(select) {
    //   min-width: 200px;
    // }
  }
</style>
