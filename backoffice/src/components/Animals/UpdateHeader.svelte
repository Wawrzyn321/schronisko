<script lang="ts">
  import type { Animal } from '.prisma/client';

  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { notifySuccess } from '../../contexts/notification.context';
  import DateFromTimestamp from '../shared/DateFromTimestamp.svelte';
  import DeleteAnimalModal from './DeleteAnimalModal.svelte';
import FormTooltipMessageWrapper from './Form/FormTooltipMessageWrapper.svelte';

  export let isPublic: boolean;
  export let timestamp: Date;
  export let isValid: boolean;
  export let animal: Animal;
  export let isSaving: boolean;
  export let updateAnimal: () => any;

  let deleteModalVisible = false;

  function onAnimalDeleted() {
    notifySuccess({ message: 'Zwierzę zostało usunięte.' });
    push('/animals');
  }
</script>

<header class="g-flex-between-100">
  <h1>
    <a href="/#/animals">Zwierzęta</a>
    <span class="g-breadcrumb-separator">/ </span>{animal.name}
  </h1>
  <span>
    Dodany:
    <DateFromTimestamp {timestamp} />
  </span>
  <div>
    <label>
      <input
        checked={isPublic}
        type="checkbox"
        on:change={() => (isPublic = !isPublic)}
      />
      Widoczny na stronie
    </label>
    <FormTooltipMessageWrapper {isValid} {animal}>
      <Button type="is-primary" on:click={updateAnimal} disabled={!isValid || isSaving}>
        Zapisz
      </Button>
    </FormTooltipMessageWrapper>
    <Button
      type="is-danger"
      on:click={() => (deleteModalVisible = true)}
      style="margin-left: 8px"
    >
      Usuń
    </Button>
  </div>
</header>
<DeleteAnimalModal
  bind:modalVisible={deleteModalVisible}
  {onAnimalDeleted}
  {animal}
/>

<style lang="scss">
  header > div {
    display: flex;
    justify-content: center;
  }

  label {
    margin-right: 16px;
  }
</style>
