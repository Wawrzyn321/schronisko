<script lang="ts">
  import { Input } from 'svelma';
  import { VirtualCaretakerType } from '@prisma/client';
  import {
    virtualCaretakerTypes,
    virtualCaretakerTypesMap,
  } from './../animalMetadata';
  import Field from '../../shared/Field.svelte';

  export let virtualCaretakerName: string | undefined;
  export let virtualCaretakerType: VirtualCaretakerType;
</script>

<div class="v-caretaker-control">
  <Field label="Wirtualny opiekun" />
  {#each virtualCaretakerTypes as type}
    <label>
      <input
        type="radio"
        checked={type === virtualCaretakerType}
        on:change={() => (virtualCaretakerType = type)}
        value={type}
      />
      {virtualCaretakerTypesMap[type]}
    </label>
  {/each}
</div>
{#if virtualCaretakerType === VirtualCaretakerType.Znalazl}
  <Field required label="Moim wirtualnym opiekunem jest">
    <Input required bind:value={virtualCaretakerName} />
  </Field>
{/if}

<style lang="scss">
  .v-caretaker-control {
    margin-top: 10px;
    max-width: 60vw;
    min-width: 30vw;
  }
</style>
