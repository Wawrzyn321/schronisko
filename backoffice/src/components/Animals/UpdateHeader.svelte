<script lang="ts">
  import type { Animal, AnimalCategory } from '.prisma/client';

  import { Button } from 'svelma';
  import { push } from 'svelte-spa-router';
  import { notifySuccess } from '../../contexts/notification.context';
  import AnimalUpdateWarningModal from '../../views/AnimalUpdateWarningModal.svelte';
  import DateFromTimestamp from '../shared/DateFromTimestamp.svelte';
  import DeleteAnimalModal from './DeleteAnimalModal.svelte';
  import { changedToReadonly } from './Form/animal-readonly';
  import FormTooltipMessageWrapper from './Form/FormTooltipMessageWrapper.svelte';

  export let isPublic: boolean;
  export let timestamp: Date;
  export let isValid: boolean;
  export let animal: Animal;
  export let isSaving: boolean;
  export let updateAnimal: () => any;
  export let prevCategory: AnimalCategory;

  let isWarningModalVisible = false;
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
    <FormTooltipMessageWrapper {isValid} animalData={animal}>
      <Button
        type="is-primary"
        on:click={() => {
          if (changedToReadonly(animal.category, prevCategory)) {
            isWarningModalVisible = true;
          } else {
            updateAnimal();
          }
        }}
        disabled={!isValid || isSaving}
      >
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
<AnimalUpdateWarningModal
  bind:modalVisible={isWarningModalVisible}
  doUpdateAnimal={updateAnimal}
  category={animal.category}
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
