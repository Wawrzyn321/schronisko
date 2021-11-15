<script lang="ts">
  import type { Animal } from '.prisma/client';

  import { Tooltip } from 'svelma';

  export let isValid: boolean;
  export let animal: Animal;

  export function formTooltipMessage(animal: Animal) {
    if (!animal.description) {
      return 'Uzupełnij opis zwierzęcia.';
    } else if (!animal.name) {
      return 'Uzupełnij imię.';
    } else if (!animal.refNo) {
      return 'Uzupełnij numer ewidencyjny.';
    } else if (!animal.contactInfo) {
      return 'Uzupełnij dane kontaktowe.';
    } else {
      return null;
    }
  }
</script>

{#if isValid}
  <slot />
{:else}
  <Tooltip position="is-left" label={formTooltipMessage(animal)}>
    <slot />
  </Tooltip>
{/if}
