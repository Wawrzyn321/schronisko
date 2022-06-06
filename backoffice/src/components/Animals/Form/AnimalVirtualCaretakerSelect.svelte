<script lang="ts">
  import { Select } from 'svelma';
  import type { VirtualCaretakerType } from '@prisma/client';
  import {
    virtualCaretakerTypes,
    virtualCaretakerTypesMap,
  } from './../animalMetadata';
  import Field from '../../shared/Field.svelte';

  export let virtualCaretakerType: VirtualCaretakerType;
  export let disabled: boolean;
</script>

<Field label="Wirtualny opiekun" style="grid-area: v-c-type">
  <Select
    required
    expanded
    nativeSize={1}
    bind:selected={virtualCaretakerType}
    {disabled}
  >
    {#each virtualCaretakerTypes as virtualCaretakerType}
      <option value={virtualCaretakerType}
        >{virtualCaretakerTypesMap[virtualCaretakerType]}</option
      >
    {/each}
  </Select>
</Field>
